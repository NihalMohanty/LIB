import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  private messageSource3 = new BehaviorSubject<User[]>(Array<User>());
  AllUserList = this.messageSource3.asObservable();
  constructor( private afs: AngularFirestore) { }

  sendUsersstoOtherComponent(user) {
  console.log(
    user + '*****************'
  );
  this.messageSource3.next(user);
}

  adduser(user: User) {
    return this.afs.collection('users').add(user);
  }
  login() {
    return this.afs.collection('users').snapshotChanges();
  }
  isLoggedIn() {
      return true;
  }
}
