import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // authState: FirebaseAuthState = null;
  private user;
  constructor(
    // private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { }

  adduser(user: User) {
    console.log(user);
    return this.afs.collection('users').add(user);
  }
  login() {
    // return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    // .then((result) => {
    // this.ngZone.run(() => {
    // this.router.navigate(['dashboard']);
    // console.log(result);
    // });

    // var userCollection = this.afs.collection('users');
    // this.user = userCollection.valueChanges();

    // #### RETRIEVE INDIVIDUAL DOCUMENT HERE ####
    // return userCollection.doc(`${name}`).ref.get().then((doc) => {
    //   this.user = doc.data();
    //   console.log(this.user)
    // });

    return this.afs.collection('users').snapshotChanges();
    // console.log(user);


    // return
    // var user = this.afs.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();

  }
  isLoggedIn() {
      return true;
  }
}
