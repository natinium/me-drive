// src/files/files.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FilesService {
  constructor(
    private storage: StorageService,
    private prisma: PrismaService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto,
    ownerId: number,
  ) {
    if (!file) {
      throw new BadRequestException('File is required for upload.');
    }

    const { folderId } = uploadFileDto;

    if (folderId) {
      const folder = await this.prisma.folder.findFirst({
        where: { id: folderId, ownerId },
      });
      if (!folder) {
        throw new NotFoundException(
          `Folder with ID ${folderId} not found or you do not have permission to access it.`,
        );
      }
    }

    const uploadResult = await this.storage.uploadFile(file);

    return this.prisma.file.create({
      data: {
        filename: file.originalname,
        fileType: file.mimetype,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        size: file.size,
        ownerId,
        folderId,
      },
    });
  }

  async findAll(ownerId: number, folderId: number | null) {
    return this.prisma.file.findMany({
      where: {
        ownerId,
        folderId,
      },
    });
  }

  async findOne(id: number, ownerId: number) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found.`);
    }

    if (file.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You do not have permission to access this file.',
      );
    }

    return file;
  }

  async remove(id: number, ownerId: number) {
    const file = await this.findOne(id, ownerId);
    await this.storage.deleteFile(file.publicId);

    return this.prisma.file.delete({
      where: { id },
    });
  }
}
