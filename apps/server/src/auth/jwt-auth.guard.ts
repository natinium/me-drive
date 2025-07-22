import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A custom authentication guard for JWT (JSON Web Token) strategy.
 * This guard will automatically trigger the Passport flow for the 'jwt' strategy.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
