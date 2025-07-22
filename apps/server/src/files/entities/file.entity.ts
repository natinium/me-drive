export class FileEntity {
  id: number;
  filename: string;
  fileType: string;
  url: string;
  publicId: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  folderId: number | null;

  constructor(partial: Partial<FileEntity>) {
    Object.assign(this, partial);
  }
}
