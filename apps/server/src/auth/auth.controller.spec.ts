import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            refreshToken: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.register on register', async () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
    };
    await controller.register(registerDto);
    expect(service.register).toHaveBeenCalledWith(registerDto);
  });

  it('should call authService.login on login', async () => {
    const req = { user: { email: 'test@example.com', password: 'password' } };
    await controller.login(req);
    expect(service.login).toHaveBeenCalledWith(req.user);
  });

  it('should call authService.refreshToken on refresh', async () => {
    const refreshTokenDto = { refreshToken: 'some-token' };
    await controller.refresh(refreshTokenDto);
    expect(service.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
  });

  it('should call authService.logout on logout', async () => {
    await controller.logout();
    expect(service.logout).toHaveBeenCalled();
  });

  it('should return user profile', () => {
    const req = {
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
    };
    const profile = controller.getProfile(req);
    expect(profile).toEqual(req.user);
  });
});
