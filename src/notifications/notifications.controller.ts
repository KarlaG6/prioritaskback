import {
Controller,
Post,
Get,
Patch,
Delete,
Param,
Body,
Req,
UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';


@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
constructor(private service: NotificationsService) {}


// Create: if body.userId omitted, use req.user.id
@Post()
create(@Req() req, @Body() dto: CreateNotificationDto) {
return this.service.create(req.user.id, dto);
}


@Get()
findAll() {
return this.service.findAll();
}


@Get(':id')
findOne(@Param('id') id: string) {
return this.service.findOne(id);
}


@Patch(':id')
update(@Param('id') id: string, @Body() dto: Partial<CreateNotificationDto>) {
return this.service.update(id, dto);
}


@Delete(':id')
delete(@Param('id') id: string) {
return this.service.delete(id);
}


// Optional: get notifications by user
@Get('/user/:userId')
findByUser(@Param('userId') userId: string) {
return this.service.findByUser(userId);
}


// Optional: get notifications by reminder
@Get('/reminder/:reminderId')
findByReminder(@Param('reminderId') reminderId: string) {
return this.service.findByReminder(reminderId);
}
}