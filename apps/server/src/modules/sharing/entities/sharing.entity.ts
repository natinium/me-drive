import { ApiProperty } from '@nestjs/swagger';

export class Share {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fileId: string;

  @ApiProperty({ required: false, nullable: true })
  sharedWithId: string | null;

  @ApiProperty()
  permission: string;

  @ApiProperty({ required: false, nullable: true })
  expiresAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
