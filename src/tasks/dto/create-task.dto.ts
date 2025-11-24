import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsNotEmpty()
  @IsString()
  priority: string;

  @IsOptional()
  dueDate?: Date | null;

  status: string;

  @IsOptional()
  @IsString()
  categoryId?: string | null; 
}
