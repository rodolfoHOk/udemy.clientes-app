import { TypeofExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao.service';
import { Usuario } from '../usuario';


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
  errorsMessages: string[] = [];
  successMessage: string = "";

  constructor( 
    private router : Router,
    private service : AutenticacaoService
  ) { }

  onSubmit() {
    // console.log(`Name: ${this.name}, Email: ${this.email}`);
    // console.log(`User: ${this.username}, Pass: ${this.password}`);
    this.errorsMessages = [];
    this.successMessage = "";
    
    const usuario : Usuario = new Usuario;
    usuario.nomeCompleto = this.name;
    usuario.email = this.email;
    usuario.username = this.username;
    usuario.password = this.password;

    this.service
            .salvar(usuario)
            .subscribe( response => {
                this.successMessage = 'Usuário cadastrado com sucesso!';
                setTimeout(() => this.router.navigate(['/login']), 2000);
              }, errorResponse => {
                this.errorsMessages = errorResponse.error.errors;
              }
            );
        
  }

}
