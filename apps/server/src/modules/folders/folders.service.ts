import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFolderDto: CreateFolderDto, ownerId: string) {
    return this.prisma.folder.create({
      data: {
        ...createFolderDto,
        ownerId,
      },
    });
  }

  async findAll(ownerId: string, parentId?: string) {
    return this.prisma.folder.findMany({
      where: {
        ownerId,
        parentId,
      },
    });
  }

  async findOne(id: string, ownerId: string) {
    return this.prisma.folder.findFirst({
      where: {
        id,
        ownerId,
      },
    });
  }

  async update(id: string, updateFolderDto: UpdateFolderDto, ownerId: string) {
    return this.prisma.folder.updateMany({
      where: {
        id,
        ownerId,
      },
      data: updateFolderDto,
    });
  }

  async remove(id: string, ownerId: string) {
    return this.prisma.folder.deleteMany({
      where: {
        id,
        ownerId,
      },
    });
  }
}
