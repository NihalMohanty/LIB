import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private afs: AngularFirestore) { }

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
