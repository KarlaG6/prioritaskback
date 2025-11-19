import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    try {
      if (!data.userId) {
        throw new BadRequestException('El userId es obligatorio');
      }
      const userExists = await this.prisma.user.findUnique({
        where: { id: data.userId },
      });
      if (!userExists) throw new NotFoundException('Usuario no encontrado');
      return this.prisma.category.create({ data });
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('Error creando la categoría');
    }
  }

  async findAllByUser(userId: string): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany({
        where: { userId },
        orderBy: { name: 'asc' },
      });
    } catch (error) {
      console.error('Error fetching categories by user:', error);
      throw new InternalServerErrorException('Error obteniendo categorías');
    }
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    return category;
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    try {
      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      throw new InternalServerErrorException('Error actualizando categoría');
    }
  }

  async delete(id: string): Promise<Category> {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new InternalServerErrorException('Error eliminando categoría');
    }
  }
}
