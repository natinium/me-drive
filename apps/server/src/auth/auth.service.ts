import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../database/prisma/prisma.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerUserDto: RegisterUserDto) {
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

    const { password, ...userWithoutPassword } = user;

    const tokens = await this.generateTokens({
      sub: user.id,
      email: user.email,
    });

    return { user: userWithoutPassword, ...tokens };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
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
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
