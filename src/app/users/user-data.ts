import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from './user';

export class UserData implements InMemoryDbService {

  createDb(): { users: User[]} {
    const users: User[] = [
      {
        id: 1,
        userName: 'thanhvu',
        password: '123',
        isAdmin: true
      },
      {
        id: 2,
        userName: 'user1',
        password: '123',
        isAdmin: false
      },
      {
        id: 3,
        userName: 'user2',
        password: '123',
        isAdmin: false
      },{
        id: 4,
        userName: 'admin',
        password: '123',
        isAdmin: true
      }
    ];
    return { users: users };
  }
}
