import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UploadFileDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  folderId?: number;
}
