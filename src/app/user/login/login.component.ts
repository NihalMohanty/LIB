import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User[];

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  loginBook(value){
    console.log(value);
    console.log(value.user_name);
    console.log(value.password);
   this.userService.login(value.user_name,value.password).subscribe(data=>{
    this.user = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      } as User;
    }),
    
    console.log(this.user);
    for (let index = 0; index < this.user.length; index++) {
     if(value.user_name===this.user[index].user_name && value.password===this.user[index].password)
     {
       localStorage.setItem("loggedinUserid",this.user[index].id);
       console.log(localStorage.getItem("loggedinUserid"));
       localStorage.setItem("loggedinUser",value.user_name);
       localStorage.setItem("loggedinUserRole",this.user[index].role);
       console.log("User set succfully");
     }
      
    }
   });
    // console.log(this.user);

    // this.bookServiceService.getBooks().subscribe(data => {
    //   this.booksArrray = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Book;
    //   })
    // });
  // }
  }

}
