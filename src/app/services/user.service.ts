// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any[]>([]);
  userData$ = this.userDataSubject.asObservable();

  updateUserList(newUser: any) {
    const currentData = this.userDataSubject.value;
    this.userDataSubject.next([...currentData, newUser]);
  }
}
