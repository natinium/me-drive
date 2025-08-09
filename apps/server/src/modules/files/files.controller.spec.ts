import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('FilesController', () => {
  let controller: FilesController;
  let service: FilesService;

  const mockFile = {
    id: 'test-file-id',
    name: 'test-file.txt',
    type: 'text/plain',
    size: BigInt(123),
    url: 'http://example.com/test-file.txt',
    thumbnailUrl: null,
    folderId: null,
    ownerId: 'test-user-id',
    isShared: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockFile]),
            findOne: jest.fn().mockResolvedValue(mockFile),
          },
        },
        PrismaService,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<FilesController>(FilesController);
    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of files', async () => {
      const result = await controller.findAll({ userId: 'test-user-id' });
      expect(result).toEqual([mockFile]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single file', async () => {
      const result = await controller.findOne(
        { userId: 'test-user-id' },
        mockFile.id,
      );
      expect(result).toEqual(mockFile);
      expect(service.findOne).toHaveBeenCalledWith('test-user-id', mockFile.id);
    });
  });
});
