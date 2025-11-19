import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class NotificationsRepository {
constructor(private prisma: PrismaService) {}


create(data: Prisma.NotificationCreateInput) {
return this.prisma.notification.create({ data });
}


findAll() {
return this.prisma.notification.findMany({ orderBy: { date: 'desc' } });
}


findOne(id: string) {
return this.prisma.notification.findUnique({ where: { id } });
}


findByUser(userId: string) {
return this.prisma.notification.findMany({ where: { userId }, orderBy: { date: 'desc' } });
}


findByReminder(reminderId: string) {
return this.prisma.notification.findMany({ where: { reminderId }, orderBy: { date: 'desc' } });
}


update(id: string, data: Prisma.NotificationUpdateInput) {
return this.prisma.notification.update({ where: { id }, data });
}


delete(id: string) {
return this.prisma.notification.delete({ where: { id } });
}
}