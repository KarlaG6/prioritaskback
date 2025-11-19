import { Controller, Post, Get, Put, Delete, Param, Body, Req } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Controller('reminders')
export class RemindersController {
  constructor(private service: RemindersService) {}

  @Post()
  create(@Body() dto: CreateReminderDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.service.findAll(req.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateReminderDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
