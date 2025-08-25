import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, IsArray, IsEmail } from 'class-validator';

export class CreateShareDto {
  @ApiProperty()
  @IsString()
  fileId: string;

  @ApiProperty({ enum: ['user', 'public'] })
  @IsIn(['user', 'public'])
  type: 'user' | 'public';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  emails?: string[];

  @ApiProperty({ enum: ['read', 'write'] })
  @IsIn(['read', 'write'])
  permission: 'read' | 'write';

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  expiresAt?: Date;
}
