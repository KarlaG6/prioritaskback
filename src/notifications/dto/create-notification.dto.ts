import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString, IsUUID } from 'class-validator';


export class CreateNotificationDto {
@IsString()
@IsNotEmpty()
message: string;


@IsDateString()
@IsOptional()
date?: string;


@IsBoolean()
@IsOptional()
read?: boolean;


@IsUUID()
@IsOptional()
reminderId?: string;


// userId is optional: if omitted, we'll take it from the authenticated user (req.user.id)
@IsUUID()
@IsOptional()
userId?: string;
}