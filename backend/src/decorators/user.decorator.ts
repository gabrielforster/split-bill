import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from './types/request-user';
// import { SessionUser } from './types/session-user';

/**
 * Route handler parameter decorator. Extracts the `user`
 * logged in to the current request session.
 *
 * For example:
 * ```ts
 * async create(@Viewer() user: User)
 * ```
 *
 * @see [Request object](https://docs.nestjs.com/controllers#request-object)
 */
export const User = createParamDecorator(
  (data: keyof RequestUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
