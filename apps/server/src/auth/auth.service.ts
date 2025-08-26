import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../database/prisma/prisma.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private serializeUser(u: any) {
    // Avoid BigInt JSON serialization issues
    const user: any = { ...u };
    if (typeof user.storageUsed === 'bigint') {
      user.storageUsed = user.storageUsed.toString();
    }
    if (typeof user.storageLimit === 'bigint') {
      user.storageLimit = user.storageLimit.toString();
    }
    return user;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerUserDto: RegisterUserDto) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: { email: registerUserDto.email },
      });

      if (userExists) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...registerUserDto,
          password: hashedPassword,
        },
      });

      const { password, ...userWithoutPasswordRaw } = user;
      const userWithoutPassword = this.serializeUser(userWithoutPasswordRaw);

      const tokens = await this.generateTokens({
        sub: user.id,
        email: user.email,
      });

      return { user: userWithoutPassword, ...tokens };
    } catch (error) {
      this.logger.error('Register error', error as any);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Unique constraint failed on the fields: (`email`)
        throw new ConflictException('User with this email already exists');
      }
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(user: any) {
    const { password, ...userWithoutPasswordRaw } = user;
    const userWithoutPassword = this.serializeUser(userWithoutPasswordRaw);
    const payload = { email: user.email, sub: user.id };
    const tokens = await this.generateTokens(payload); // Generate both tokens
    return {
      user: userWithoutPassword, // Return the user object directly
      token: tokens.accessToken, // Map accessToken to token
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const refreshSecret =
        this.configService.get<string>('JWT_REFRESH_SECRET') ||
        'dev_jwt_refresh_secret';
      const payload = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: refreshSecret,
        },
      );

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }

      return this.generateTokens({ sub: user.id, email: user.email });
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(payload: { sub: string; email: string }) {
    const accessSecret =
      this.configService.get<string>('JWT_SECRET') || 'dev_jwt_secret';
    const refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') ||
      'dev_jwt_refresh_secret';
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
        expiresIn: '365d',
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
