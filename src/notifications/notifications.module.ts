import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository, PrismaService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
