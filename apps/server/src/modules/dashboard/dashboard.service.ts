import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(ownerId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: ownerId },
      select: { storageUsed: true, storageLimit: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const totalFiles = await this.prisma.file.count({ where: { ownerId } });
    const totalFolders = await this.prisma.folder.count({ where: { ownerId } });
    const recentFilesRaw = await this.getRecentFiles(ownerId, 5);
    const recentFiles = recentFilesRaw.map((f: any) => ({
      ...f,
      size: typeof f.size === 'bigint' ? Number(f.size) : f.size,
    }));

    return {
      totalFiles,
      totalFolders,
      storageUsed:
        typeof user.storageUsed === 'bigint'
          ? Number(user.storageUsed)
          : (user.storageUsed as any),
      storageLimit:
        typeof user.storageLimit === 'bigint'
          ? Number(user.storageLimit)
          : (user.storageLimit as any),
      recentFiles,
    };
  }

  async getRecentFiles(ownerId: string, limit = 10) {
    return this.prisma.file.findMany({
      where: { ownerId },
      orderBy: { updatedAt: 'desc' },
      take: +limit,
      select: {
        id: true,
        name: true,
        type: true,
        size: true,
        updatedAt: true,
      },
    });
  }
}
