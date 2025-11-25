import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class OnboardingDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];
}
