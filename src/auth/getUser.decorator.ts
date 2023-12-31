import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './entities/auth.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
