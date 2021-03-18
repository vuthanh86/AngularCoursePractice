import { Injectable, OnInit } from '@angular/core';

import { User } from './user';
import { MessageService } from '../messages/message.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userApiUrl = 'api/users';
  currentUser: User;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userApiUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  login(userName: string, password: string): boolean {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your userName and password');
      return false;
    }
    const userRes = this.filterUser(userName, password);

    if (!userRes) {
      this.messageService.addMessage('userName or password was not correct. Pls try again');
      return false;
    }

    this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    return true;
  }

  filterUser(usrName: string, pwd: string): User {
    let users: User[] = [];
    this.getUsers().subscribe({
      next: usrs => users = usrs,
      error: err => console.log(err)
    })
    if (!users || users.length === 0)
      return null;

    const filtered = users.find(user => user.userName.toLowerCase() === usrName.toLowerCase()
                                      && user.password.toLowerCase() === pwd.toLowerCase());
    if (!filtered)
      return null;

    return filtered;
  }

  logout(): void {
    this.currentUser = null;
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
