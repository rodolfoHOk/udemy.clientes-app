import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor( 
              private router : Router,
              private service : AutenticacaoService             
  ) { }

  onSubmit(){
    // console.log(`User: ${this.username}, Pass: ${this.password}`);
    this.errorMessage = '';
    this.service
              .tentarLogar(this.username, this.password)
              .subscribe( response => {
                // console.log(response);
                const access_token = JSON.stringify(response);
                localStorage.setItem('access_token', access_token);
                this.router.navigate(['/home']);
              }, errorResponse => {
                  this.errorMessage = "Nome de usuário e/ou senha incorreto(s)!";
              });
  }

}
