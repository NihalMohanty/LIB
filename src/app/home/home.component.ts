import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'My Library!!';
  private user: User[] = Array<User>();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.login().subscribe(data => {
      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      }),
        console.log('**********');
    });
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goRegister() {
    console.log('Register');
    this.router.navigate(['/register']);
  }

  goLogin() {
    this.userService.sendUsersstoOtherComponent(this.user);
    console.log('login');
    this.router.navigate(['/login']);
  }
}
