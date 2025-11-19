import { ReminderStrategy } from './reminder-strategy.interface';

export class OneTimeReminderStrategy implements ReminderStrategy {
  calculateNextDate(): Date | null {
    return null; // No se repite
  }
}
