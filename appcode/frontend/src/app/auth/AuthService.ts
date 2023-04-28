import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../data-model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(user: User): Observable<boolean> {
    const authenticatedUser = user;
    this.currentUserSubject.next(authenticatedUser);
    return of(true);
  }

  public logout(): void {
    this.currentUserSubject.next(new User());
  }

  public getCurrentUserRole(): string | null {
    if (this.currentUserSubject.value?.userId) {
      return this.currentUserSubject.value.userRole[0];
    } else {
      if (sessionStorage.getItem('userRole') != null) {
        return sessionStorage.getItem('userRole');
      } else {
        return null;
      }
    }
  }
}
