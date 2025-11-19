import { Module } from '@nestjs/common';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { RemindersRepository } from './reminders.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RemindersController],
  providers: [RemindersService, RemindersRepository, PrismaService],
})
export class RemindersModule {}
