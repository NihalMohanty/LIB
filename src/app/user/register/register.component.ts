import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerBook(user: User) {
    user.role = 'user';
    this.userService.adduser(user);
    alert('Congrats! You can now Login easily!');
    this.router.navigate(['/']);
  }

  onClose() {
    this.router.navigate(['/']);
  }

}
