import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserEntity> {
    const { email, password, name } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });

    return new UserEntity(createdUser);
  }

  async login(
    email: string,
    pass: string,
  ): Promise<{ user: UserEntity; access_token: string }> {
    // 1. Change the return type
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // 2. Sanitize the user object to remove the password using your UserEntity
    const sanitizedUser = new UserEntity(user);

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // 3. Return the new structure including the sanitized user and the token
    return {
      user: sanitizedUser,
      access_token: accessToken,
    };
  }
}
