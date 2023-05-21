import { User } from '@prisma/client';

export type UserNoPass = Omit<User, 'password'>;
