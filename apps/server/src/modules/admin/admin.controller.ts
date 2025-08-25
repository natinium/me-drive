import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma/prisma.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('users')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async users(@Query('limit') limit = 50) {
    return this.prisma.user
      .findMany({
        take: +limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          storageUsed: true,
          storageLimit: true,
          createdAt: true,
        },
      })
      .then((rows) =>
        rows.map((u: any) => ({
          ...u,
          storageUsed:
            typeof u.storageUsed === 'bigint'
              ? Number(u.storageUsed)
              : u.storageUsed,
          storageLimit:
            typeof u.storageLimit === 'bigint'
              ? Number(u.storageLimit)
              : u.storageLimit,
        })),
      );
  }

  @Get('files')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async files(@Query('limit') limit = 100) {
    return this.prisma.file
      .findMany({
        take: +limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          type: true,
          size: true,
          ownerId: true,
          folderId: true,
          createdAt: true,
        },
      })
      .then((rows) =>
        rows.map((f: any) => ({
          ...f,
          size: typeof f.size === 'bigint' ? Number(f.size) : f.size,
        })),
      );
  }

  @Get('folders')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async folders(@Query('limit') limit = 100) {
    return this.prisma.folder.findMany({
      take: +limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        parentId: true,
        ownerId: true,
        createdAt: true,
      },
    });
  }
}
