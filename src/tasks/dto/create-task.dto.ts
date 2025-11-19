import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsNotEmpty()
  @IsUUID()
  userId: string; // obligatorio, debe ser UUID de un usuario existente

  status: string;
}
