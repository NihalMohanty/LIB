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
    // NESSERY DONT REMOVE THE LONES ONLY REMOVE THE CPOMMENTS
    // if(localStorage.getItem('loggedinUser') != null)
    // {
    this.router.navigate(['/dashboard']);
  // } else {
  //   alert("Please login");
  // }
  }

  goRegister() {
    console.log('Register');
    this.router.navigate(['/register']);
  }

  goLogin() {
    console.log('login');
    this.router.navigate(['/login']);
  }

  // goLogOut(){
  //   localStorage.clear();
  // }

}
