import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User[];
  flag = false;

  constructor(private userService: UserService, private router: Router) {
    this.userService.AllUserList.subscribe(data => { this.user = data; console.log(this.user); });
  }

  ngOnInit() {
  }

  loginBook(value) {

    console.log(this.user);
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.user.length; index++) {
      if (value.user_name === this.user[index].user_name && value.password === this.user[index].password) {
        localStorage.setItem('loggedinUserid', this.user[index].id);
        localStorage.setItem('loggedinUser', value.user_name);
        localStorage.setItem('loggedinUserRole', this.user[index].role);
        this.router.navigate(['/dashboard']);
        this.flag = true;
      }
    }
    if (this.flag === false) {
      alert('Seems like you are new here! Please Register yourself before Loging in!');
      this.router.navigate(['/']);
    }
  }

  onClose() {
    this.router.navigate(['/']);
  }

}
