import { ReminderStrategy } from './reminder-strategy.interface';
import { ReminderInterval } from '@prisma/client';

export class RecurringReminderStrategy implements ReminderStrategy {
  calculateNextDate(currentDate: Date, interval: ReminderInterval): Date {
    const newDate = new Date(currentDate);

    switch (interval) {
      case 'DAILY':
        newDate.setDate(newDate.getDate() + 1);
        break;

      case 'WEEKLY':
        newDate.setDate(newDate.getDate() + 7);
        break;

      case 'MONTHLY':
        newDate.setMonth(newDate.getMonth() + 1);
        break;

      case 'YEARLY':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;

      default:
        throw new Error(`Invalid interval: ${interval}`);
    }

    return newDate;
  }
}
