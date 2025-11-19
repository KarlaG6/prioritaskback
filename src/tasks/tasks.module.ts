import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, PrismaService]
})
export class TasksModule {}
