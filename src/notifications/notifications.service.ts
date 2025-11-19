import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Notification } from '@prisma/client';
import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';


@Injectable()
export class NotificationsService {
constructor(private repo: NotificationsRepository, private prisma: PrismaService) {}


// ownerId: authenticated user id (if dto.userId missing we use this)
async create(ownerId: string, dto: CreateNotificationDto): Promise<Notification> {
const userId = dto.userId ?? ownerId;


// Optional: verify user exists
const user = await this.prisma.user.findUnique({ where: { id: userId } });
if (!user) throw new BadRequestException('User not found');


const data = {
message: dto.message,
date: dto.date ? new Date(dto.date) : undefined,
read: dto.read ?? false,
reminder: dto.reminderId ? { connect: { id: dto.reminderId } } : undefined,
user: { connect: { id: userId } },
} as any;


return this.repo.create(data);
}


findAll() {
return this.repo.findAll();
}


async findOne(id: string) {
const n = await this.repo.findOne(id);
if (!n) throw new NotFoundException('Notification not found');
return n;
}


async update(id: string, dto: Partial<CreateNotificationDto>) {
// If reminderId provided, ensure exists
if (dto.reminderId) {
const r = await this.prisma.reminder.findUnique({ where: { id: dto.reminderId } });
if (!r) throw new BadRequestException('Reminder not found');
}


const data: any = {
...(dto.message !== undefined ? { message: dto.message } : {}),
...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
...(dto.read !== undefined ? { read: dto.read } : {}),
...(dto.reminderId !== undefined ? { reminder: dto.reminderId ? { connect: { id: dto.reminderId } } : { disconnect: true } } : {}),
};


return this.repo.update(id, data);
}


delete(id: string) {
return this.repo.delete(id);
}


findByUser(userId: string) {
return this.repo.findByUser(userId);
}


findByReminder(reminderId: string) {
return this.repo.findByReminder(reminderId);
}
}