import { ReminderInterval } from "@prisma/client";

export interface ReminderStrategy {
  calculateNextDate(
    currentDate: Date,
    interval?: ReminderInterval
  ): Date | null;
}

export class OneTimeReminderStrategy implements ReminderStrategy {
  calculateNextDate(): Date | null {
    return null; // no se repite
  }
}

export class DailyReminderStrategy implements ReminderStrategy {
  calculateNextDate(currentDate: Date): Date {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }
}

export class WeeklyReminderStrategy implements ReminderStrategy {
  calculateNextDate(currentDate: Date): Date {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    return newDate;
  }
}
export class MonthlyReminderStrategy implements ReminderStrategy {
  calculateNextDate(currentDate: Date): Date {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }
}
export class YearlyReminderStrategy implements ReminderStrategy {
  calculateNextDate(currentDate: Date): Date {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
}
