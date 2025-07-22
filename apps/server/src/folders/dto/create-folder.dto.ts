// src/folders/dto/create-folder.dto.ts

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt() // Validate that it's an integer
  @Type(() => Number) // Transform the incoming value to a number
  parentId?: number;
}
