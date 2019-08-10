import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
  profile = localStorage.getItem('loggedinUser');

  ngOnInit() {
  }

  goLogOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
