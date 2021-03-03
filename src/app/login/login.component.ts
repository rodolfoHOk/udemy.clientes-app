import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  loginError: boolean = false;

  constructor( private router : Router) { }

  onSubmit(){
    console.log(`User: ${this.username}, Pass: ${this.password}`);
    this.router.navigate(['/home'])
  }

}
