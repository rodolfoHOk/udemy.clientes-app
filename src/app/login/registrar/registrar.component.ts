import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  name: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor( private router : Router ) { }

  onSubmit(){
    console.log(`Name: ${this.name}, Email: ${this.email}`);
    console.log(`User: ${this.username}, Pass: ${this.password}`);
    this.router.navigate(['/login']);
  }

}
