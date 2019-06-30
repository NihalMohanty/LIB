import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'My Library!!';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goRegister(){
    console.log("Register");
    this.router.navigate(['/register']);
  }

  goLogin(){
    console.log("login");
    this.router.navigate(['/login']);
  }

}
