import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, Task } from '@prisma/client';
import { log } from 'node:console';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<Task> {
    try {
      // log('Creating task for user ID:', data);
      if (!data.userId) {
        throw new BadRequestException('El userId es obligatorio');
      }
      const userExists = await this.prisma.user.findUnique({
        where: { id: data.userId },
      });
      if (!userExists) throw new NotFoundException('Usuario no encontrado');
      return await this.prisma.task.create({
        data: {
          title: data.title,
          description: data.description ?? null,
          status: 'pending',
          priority: data.priority,
          dueDate: data.dueDate ?? null,
          user: {
            connect: { id: data.userId },
          },
        },
      });
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException('Error creando la tarea');
    }
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    try {
      return await this.prisma.task.findMany({ where: { userId } });
    } catch (error) {
      console.error('Error fetching tasks by user:', error);
      throw new InternalServerErrorException('Error obteniendo tareas');
    }
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    return task;
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    try {
      return await this.prisma.task.update({ where: { id }, data });
    } catch (error) {
      console.error('Error updating task:', error);
      throw new InternalServerErrorException('Error actualizando tarea');
    }
  }
  async delete(id: string): Promise<Task> {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new InternalServerErrorException('Error eliminando tarea');
    }
  }
}
