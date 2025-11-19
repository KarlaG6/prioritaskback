import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { ReminderStrategyFactory } from './strategies/reminder-strategy.factory';
import { Reminder, ReminderType } from '@prisma/client';
import { RemindersRepository } from './reminders.repository';

@Injectable()
export class RemindersService {
  constructor(private repo: RemindersRepository) {}

  async create(dto: CreateReminderDto) {
    const scheduleDate = dto.scheduleAt ? new Date(dto.scheduleAt) : null;

    const strategy = ReminderStrategyFactory.getStrategy(dto.type);

    const nextDate =
      dto.type === ReminderType.RECURRING && scheduleDate && dto.interval
        ? strategy.calculateNextDate(scheduleDate, dto.interval)
        : null;

    return this.repo.create({
      ...dto,
      scheduleAt: scheduleDate,
    });
  }

  async findAll(userId: string): Promise<Reminder[]> {
    try {
      return await this.repo.findAll(userId);
    } catch (error) {
      console.error('Error fetching reminders by user:', error);
      throw new InternalServerErrorException('Error obteniendo recordatorios');
    }
  }

  async findOne(id: string) {
    const reminder = await this.repo.findOne(id);
    if (!reminder) throw new NotFoundException('Reminder not found');
    return reminder;
  }

  update(id: string, dto: Partial<CreateReminderDto>) {
    return this.repo.update(id, dto);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
