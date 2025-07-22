import { User } from '@prisma/client';

export class UserEntity {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
