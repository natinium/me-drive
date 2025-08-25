import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { email?: string } | undefined;
    const adminCsv = this.config.get<string>('ADMIN_EMAILS') || '';
    const admins = adminCsv
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    const isAdmin = !!user?.email && admins.includes(user.email);
    if (!isAdmin) {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}
