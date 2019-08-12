import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    console.log('AlwaysAuthGuard');
    return true;
  }
}

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor() { }
  canActivate() {
    if (localStorage.getItem('loggedinUser') !== null) {
      return true;
    } else {
      window.alert('OPPS! You do not have permission to view this page, Please Login!');
    }
  }
}
