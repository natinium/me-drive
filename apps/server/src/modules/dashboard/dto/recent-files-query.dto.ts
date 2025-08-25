import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class RecentFilesQueryDto {
  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
