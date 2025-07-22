// src/folders/folders.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  // FIX: Method now accepts 'ownerId'
  async create(createFolderDto: CreateFolderDto, ownerId: number) {
    const { name, parentId } = createFolderDto;

    if (parentId) {
      const parentFolder = await this.prisma.folder.findFirst({
        where: { id: parentId, ownerId },
      });
      if (!parentFolder) {
        throw new NotFoundException(
          `Parent folder with ID ${parentId} not found`,
        );
      }
    }

    return this.prisma.folder.create({
      data: { name, ownerId, parentId },
    });
  }

  // FIX: Method now accepts 'ownerId'
  async findAll(ownerId: number, parentId?: string) {
    const parentIdNumber = parentId ? parseInt(parentId, 10) : null;

    return this.prisma.folder.findMany({
      where: { ownerId, parentId: parentIdNumber },
    });
  }

  // FIX: Method now accepts 'ownerId' to check for ownership
  async findOne(id: number, ownerId: number) {
    const folder = await this.prisma.folder.findFirst({
      where: { id, ownerId },
      include: { children: true, files: true },
    });
    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found.`);
    }
    return folder;
  }

  // FIX: Method now accepts 'ownerId'
  async update(id: number, updateFolderDto: UpdateFolderDto, ownerId: number) {
    await this.findOne(id, ownerId); // Ensures folder exists and belongs to the user
    return this.prisma.folder.update({
      where: { id },
      data: updateFolderDto,
    });
  }

  // FIX: Method now accepts 'ownerId'
  async remove(id: number, ownerId: number) {
    await this.findOne(id, ownerId); // Ensures folder exists and belongs to the user
    return this.prisma.folder.delete({ where: { id } });
  }
}
