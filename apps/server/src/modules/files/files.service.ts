import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async findAll(userId: string, args: Prisma.FileFindManyArgs) {
    return this.prisma.file.findMany({
      where: {
        ownerId: userId,
      },
      ...args,
    });
  }

  async findOne(userId: string, id: string) {
    const file = await this.prisma.file.findFirst({
      where: { id, ownerId: userId },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  async uploadFile(
    userId: string,
    file: Express.Multer.File,
    createFileDto: CreateFileDto,
  ) {
    const uploadedFile = await this.storageService.upload(file);

    return this.prisma.file.create({
      data: {
        name: createFileDto.name || file.originalname,
        type: file.mimetype,
        size: file.size,
        url: uploadedFile.secure_url,
        thumbnailUrl: uploadedFile.secure_url, // Placeholder for thumbnail
        ownerId: userId,
        folderId: createFileDto.folderId,
      },
    });
  }
}
