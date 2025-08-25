import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, File } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateFileDto } from './dto/create-file.dto';

// Custom type to handle BigInt serialization
export type SafeFile = Omit<File, 'size'> & { size: string };

@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  private toSafeFile(file: File): SafeFile {
    return {
      ...file,
      size: file.size.toString(),
    };
  }

  private toSafeFiles(files: File[]): SafeFile[] {
    return files.map(this.toSafeFile);
  }

  async findAll(
    userId: string,
    args: Prisma.FileFindManyArgs,
  ): Promise<SafeFile[]> {
    const files = await this.prisma.file.findMany({
      where: {
        ownerId: userId,
      },
      ...args,
    });
    return this.toSafeFiles(files);
  }

  async findOne(userId: string, id: string): Promise<SafeFile> {
    const file = await this.prisma.file.findFirst({
      where: { id, ownerId: userId },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return this.toSafeFile(file);
  }

  async uploadFile(
    userId: string,
    file: Express.Multer.File,
    createFileDto: CreateFileDto,
  ): Promise<SafeFile> {
    const uploadedFile = await this.storageService.upload(file);

    const url: string = uploadedFile.secure_url || uploadedFile.url;
    const newFile = await this.prisma.file.create({
      data: {
        name: createFileDto.name || file.originalname,
        type: file.mimetype,
        size: BigInt(file.size),
        url,
        thumbnailUrl: url, // Placeholder for thumbnail
        ownerId: userId,
        folderId: createFileDto.folderId,
      },
    });
    return this.toSafeFile(newFile);
  }
}
