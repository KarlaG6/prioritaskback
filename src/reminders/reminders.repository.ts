import { Injectable } from '@nestjs/common';
import { Reminder, ReminderType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Injectable()
export class RemindersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateReminderDto): Promise<Reminder> {
    return this.prisma.reminder.create({ data });
  }

  findAll(userId: string) {
    return this.prisma.reminder.findMany({
      where: { userId },
      include: { notifications: true }
    });
  }

  findOne(id: string) {
    return this.prisma.reminder.findUnique({
      where: { id },
      include: { notifications: true }
    });
  }

  update(id: string, data: any) {
    return this.prisma.reminder.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.reminder.delete({ where: { id } });
  }
}
