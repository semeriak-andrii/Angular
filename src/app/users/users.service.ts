import { Injectable } from '@angular/core';
import { data } from './mocked-users';
import { User } from './user';

@Injectable()
export class UsersService {

  constructor() { }

  getMockedUsers(): User[] {
    const users = data.map(user => new User(user));
    return users;
  }
}
