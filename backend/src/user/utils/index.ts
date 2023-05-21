import { hash, compare } from 'bcrypt';

export function hashPassword(pass: string): Promise<string> {
  return hash(pass, 10);
}

export function comparePassword(pass: string, hash: string): Promise<boolean> {
  return compare(pass, hash);
}
