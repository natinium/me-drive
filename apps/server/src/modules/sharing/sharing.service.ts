import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateShareDto } from './dto/create-sharing.dto';

@Injectable()
export class SharingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShareDto: CreateShareDto, ownerId: string) {
    if (createShareDto.type === 'user') {
      const users = await this.prisma.user.findMany({
        where: {
          email: { in: createShareDto.emails },
        },
      });

      const shares = users.map((user) => ({
        fileId: createShareDto.fileId,
        sharedWithId: user.id,
        permission: createShareDto.permission,
        expiresAt: createShareDto.expiresAt,
      }));

      await this.prisma.share.createMany({
        data: shares,
      });
    } else {
      await this.prisma.share.create({
        data: {
          fileId: createShareDto.fileId,
          permission: createShareDto.permission,
          expiresAt: createShareDto.expiresAt,
        },
      });
    }

    await this.prisma.file.update({
      where: { id: createShareDto.fileId },
      data: { isShared: true },
    });

    return { message: 'File shared successfully' };
  }

  async findOne(id: string) {
    return this.prisma.share.findFirst({
      where: { id },
      include: {
        file: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        sharedWith: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
