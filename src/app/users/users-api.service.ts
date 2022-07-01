import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UsersApiService {

  usersApi(id = ''): string {
    return `https://jsonplaceholder.typicode.com/users/${id}`
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersApi()).pipe(
      map((data: any) => data.map((user: any) => new User(user)))
    );
  }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post(this.usersApi(), user).pipe(
      map((data: any) => {
        return new User(user);
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.usersApi(userId.toString()));
  }
}
