import { Injectable } from '@nestjs/common';
import {
  UploadApiResponse,
  DeleteApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class StorageService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(new Error(error.message));
          }

          if (!result) {
            return reject(
              new Error(
                'Cloudinary upload failed: No result or error returned.',
              ),
            );
          }

          resolve(result);
        },
      );

      upload.end(file.buffer);
    });
  }

  async deleteFile(publicId: string): Promise<DeleteApiResponse> {
    // FIX: We are telling TypeScript to treat the 'any' return value
    // as a 'DeleteApiResponse'.
    return (await cloudinary.uploader.destroy(publicId)) as DeleteApiResponse;
  }
}
