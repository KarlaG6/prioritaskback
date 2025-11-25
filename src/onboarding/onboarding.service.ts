// src/onboarding/onboarding.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ONBOARDING_TEMPLATES } from "./templates";
import { OnboardingDto } from "./dto/onboarding.dto";
import { Category } from "@prisma/client";

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async markComplete(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { onboarded: true },
    });
  }

  /**
   * Procesa onboarding: crea categorías, tareas y recordatorios.
   * Todo en transacción para evitar estados a medias.
   */
  async processOnboarding(userId: string, dto: OnboardingDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    // Ejecutar todo en una transacción
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const createdCategories: Category[] = [];

        // 1) Crear (o reutilizar) categorías por cada rol
        for (const role of dto.roles) {
          const template = ONBOARDING_TEMPLATES[role];
          if (!template) continue;

          for (const cat of template.categories) {
            // buscar si la categoría ya existe para este user (idempotente)
            let category = await tx.category.findFirst({
              where: { userId, name: cat.name },
            });

            if (!category) {
              category = await tx.category.create({
                data: { name: cat.name, color: cat.color, userId },
              });
            }
            createdCategories.push(category);
          }
        }

        // 2) Crear tareas y recordatorios
        for (const role of dto.roles) {
          const template = ONBOARDING_TEMPLATES[role];
          if (!template) continue;

          for (const task of template.tasks) {
            // Reusar categoría creada (por nombre)
            const category = createdCategories.find((c) => c.name === task.category);

            const createdTask = await tx.task.create({
              data: {
                title: task.title,
                description: task.description ?? null,
                status: task.status ?? "pending",
                priority: task.priority ?? "medium",
                categoryId: category ? category.id : null,
                userId,
              },
            });

            // Recordatorio ONE_TIME (days before -> scheduleAt)
            if (task.remindDaysBefore && typeof task.remindDaysBefore === "number") {
              const scheduleAt = new Date(Date.now() + task.remindDaysBefore * 86400000);
              await tx.reminder.create({
                data: {
                  message: `Recordatorio: ${task.title}`,
                  type: "ONE_TIME",
                  scheduleAt,
                  userId,
                  taskId: createdTask.id,
                },
              });
            }

            // Recordatorio RECURRING (months)
            if (task.remindEveryMonths && typeof task.remindEveryMonths === "number") {
              const scheduleAt = new Date();
              scheduleAt.setMonth(scheduleAt.getMonth() + task.remindEveryMonths);

              await tx.reminder.create({
                data: {
                  message: `Recordatorio periódico: ${task.title}`,
                  type: "RECURRING",
                  scheduleAt,
                  interval: "MONTHLY", // ajustado a tu enum
                  userId,
                  taskId: createdTask.id,
                },
              });
            }
          }
        }

        // 3) Opcional: marcar usuario como onboarded inmediatamente (o hacer PATCH aparte)
        // await tx.user.update({ where: { id: userId }, data: { onboarded: true } });

        return { message: "Onboarding processed" };
      });

      return result;
    } catch (error) {
      console.error("Onboarding transaction error:", error);
      throw new InternalServerErrorException("Error processing onboarding");
    }
  }
}
