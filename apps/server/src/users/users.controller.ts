import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req: Request): UserEntity {
    return new UserEntity(req.user as User);
  }

  @Patch('me')
  updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = req.user as User;
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProfile(@Req() req: Request): Promise<UserEntity> {
    const user = req.user as User;
    return this.usersService.remove(user.id);
  }
}
