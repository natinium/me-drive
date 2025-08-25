import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {
    // Configure Cloudinary with individual environment variables
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });

      console.log('Cloudinary configured with individual variables:', {
        cloud_name: cloudName,
        api_key: apiKey,
        // Don't log api_secret for security
      });
    } else {
      console.log('Cloudinary not configured properly');
    }
  }

  async upload(file: Express.Multer.File): Promise<UploadApiResponse | any> {
    const driver = this.configService.get<string>('STORAGE_DRIVER') || 'local';
    console.log('Using storage driver:', driver);

    if (driver === 'cloudinary') {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder:
              this.configService.get<string>('CLOUDINARY_FOLDER') || 'medrive',
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error);
            }
            if (result) {
              console.log('Cloudinary upload result:', result);
              resolve(result);
            } else {
              const error = new Error(
                'Upload failed, no result from Cloudinary',
              );
              console.error(error.message);
              reject(error);
            }
          },
        );
        uploadStream.end(file.buffer);
      });
    }

    // Local storage fallback
    console.log('Using local storage fallback');
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
