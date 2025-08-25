import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    avatar: null,
    storageUsed: BigInt(0),
    storageLimit: BigInt(1073741824),
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getProfile: jest.fn().mockResolvedValue(mockUser),
            updateProfile: jest.fn().mockResolvedValue(mockUser),
          },
        },
        PrismaService,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      const result = await controller.getProfile({ userId: mockUser.id });
      expect(result).toEqual(mockUser);
      expect(service.getProfile).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateProfile', () => {
    it('should update and return the user profile', async () => {
      const updateUserDto = { name: 'Updated Name' };
      const result = await controller.updateProfile(
        { userId: mockUser.id },
        updateUserDto,
      );
      expect(result).toEqual(mockUser);
      expect(service.updateProfile).toHaveBeenCalledWith(
        mockUser.id,
        updateUserDto,
      );
    });
  });
});
