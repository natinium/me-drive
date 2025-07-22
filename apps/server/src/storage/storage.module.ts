import { Module } from '@nestjs/common';
import { StorageProvider } from './storage.provider';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageProvider, StorageService],
  exports: [StorageProvider, StorageService],
})
export class StorageModule {}
