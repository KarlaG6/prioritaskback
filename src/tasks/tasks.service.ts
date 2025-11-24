import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private repo: TaskRepository) {}

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    try {
      return await this.repo.create(userId, {
        title: dto.title,
        description: dto.description ?? null,
        status: 'pending',
        priority: dto.priority ?? 'normal',
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        categoryId: dto.categoryId ?? null,
      });
    } catch (error) {
      console.error('Error en TasksService.create:', error);
      throw new InternalServerErrorException('No se pudo crear la tarea');
    }
  }

  findAll(userId: string): Promise<Task[]> {
    return this.repo.findAllByUser(userId);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.repo.findOne(id);
    if (!task) throw new NotFoundException('Tarea no encontrada');
    return task;
  }
  update(id: string, dto: Partial<CreateTaskDto>): Promise<Task> {
    return this.repo.update(id, {
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    });
  }

  delete(id: string): Promise<Task> {
    return this.repo.delete(id);
  }
}
