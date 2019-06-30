import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  registerBook(user:User){
    console.log(user);
    user.role="user";
    this.userService.adduser(user);
  }

}
