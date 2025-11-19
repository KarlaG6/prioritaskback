import { ReminderType } from '@prisma/client';
import { OneTimeReminderStrategy } from './one-time.strategy';
import { RecurringReminderStrategy } from './recurring.strategy';

export class ReminderStrategyFactory {
  static getStrategy(type: ReminderType) {
    switch (type) {
      case ReminderType.ONE_TIME:
        return new OneTimeReminderStrategy();

      case ReminderType.RECURRING:
        return new RecurringReminderStrategy();

      default:
        throw new Error(`Unknown reminder type: ${type}`);
    }
  }
}
