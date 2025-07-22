// src/users/dto/update-user.dto.ts

import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
