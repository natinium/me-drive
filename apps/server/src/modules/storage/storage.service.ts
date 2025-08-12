import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async upload(file: Express.Multer.File): Promise<UploadApiResponse | any> {
    const driver = this.configService.get<string>('STORAGE_DRIVER') || 'local';
    if (driver === 'cloudinary') {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Upload failed, no result from Cloudinary'));
            }
          },
        );
        uploadStream.end(file.buffer);
      });
    }

    // Local storage fallback
    const uploadsDir =
      this.configService.get<string>('UPLOADS_DIR') ||
      path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const safeName = `${Date.now()}-${file.originalname}`.replace(
      /[^a-zA-Z0-9_.-]/g,
      '_',
    );
    const fullPath = path.join(uploadsDir, safeName);
    await fs.writeFile(fullPath, file.buffer);
    const publicBase = this.configService.get<string>('PUBLIC_BASE_URL') || '';
    const urlPath = `/uploads/${safeName}`;
    const url = publicBase ? `${publicBase}${urlPath}` : urlPath;
    return {
      url,
      secure_url: url,
      original_filename: file.originalname,
      bytes: file.size,
      resource_type: 'raw',
    };
  }
}
