import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = await context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
      return next.handle();
    }
    throw new NotFoundException('User not logged in');
  }
}
