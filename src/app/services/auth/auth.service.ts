import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    console.log('AlwaysAuthGuard');
    return true;
  }
}

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate() {
    console.log('OnlyLoggedInUsers');
    if (localStorage.getItem('loggedinUser') !== null) {
      return true;
    } else {
      window.alert('OPPS! You do not have permission to view this page, Please Login!');
      this.router.navigate(['/login']);
    }
  }
}
