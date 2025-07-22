import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private toUserEntity(user: User): UserEntity {
    return new UserEntity(user);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return this.toUserEntity(updatedUser);
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.prisma.user.delete({ where: { id } });
    return this.toUserEntity(user);
  }
}
