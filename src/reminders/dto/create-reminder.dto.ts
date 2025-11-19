import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsEnum,
  IsDateString
} from 'class-validator';
import { ReminderType, ReminderInterval } from '@prisma/client';

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(ReminderType)
  @IsNotEmpty()
  type: ReminderType;

  @IsOptional()
  scheduleAt?: Date | null;

  @IsOptional()
  @IsEnum(ReminderInterval)
  interval?: ReminderInterval;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  taskId?: string;
}
