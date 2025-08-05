import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUser(): string {
    return 'User';
  }

  createUser(): string {
    return 'User created !'
  }

  getUserById(id: number): string {
    return `User ${id}`;
  }
}
