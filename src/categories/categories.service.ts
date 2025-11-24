import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private repo: CategoriesRepository) {}

  async create(userId: string, dto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.repo.create({
        name: dto.name,
        color: dto.color,
        userId: userId,
      });
    } catch (error) {
      console.error('Error en CategoryService.create:', error);
      throw new InternalServerErrorException('No se pudo crear la categoría');
    }
  }

  async findAll(userId: string): Promise<Category[]> {
    try {
      return await this.repo.findAllByUser(userId);
    } catch (error) {
      console.error('Error fetching categories by user:', error);
      throw new InternalServerErrorException('Error obteniendo categorías');
    }
  }
  async getTasksByCategory(userId: string): Promise<Category[]> {
    try {
      return await this.repo.getTasksByCategory(userId);
    } catch (error) {
      console.error('Error fetching tasks by categories by user:', error);
      throw new InternalServerErrorException('Error obteniendo tareas por categorías');
    }
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.repo.findOne(id);
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return category;
  }

  update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    return this.repo.update(id, dto);
  }

  delete(id: string): Promise<Category> {
    return this.repo.delete(id);
  }
}
