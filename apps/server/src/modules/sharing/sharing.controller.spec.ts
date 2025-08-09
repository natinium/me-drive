import { Test, TestingModule } from '@nestjs/testing';
import { SharingController } from './sharing.controller';
import { SharingService } from './sharing.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

describe('SharingController', () => {
  let controller: SharingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharingController],
      providers: [SharingService, PrismaService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SharingController>(SharingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
