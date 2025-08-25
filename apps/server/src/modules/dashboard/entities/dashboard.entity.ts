import { ApiProperty } from '@nestjs/swagger';

export class Dashboard {
  @ApiProperty()
  totalFiles: number;

  @ApiProperty()
  totalFolders: number;

  @ApiProperty()
  storageUsed: bigint;

  @ApiProperty()
  storageLimit: bigint;

  @ApiProperty()
  recentFiles: any[];
}
