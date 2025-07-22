// src/files/dto/upload-file.dto.ts

import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UploadFileDto {
  @IsOptional()
  @IsInt({ message: 'folderId must be a valid integer.' })
  @Type(() => Number)
  folderId?: number;
}
