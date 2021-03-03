import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  successMessage = '';
  errors: string[] = [];
  id: number = 0;

  constructor( 
    private service : ClientesService,
    private router : Router,
    private activatedRoute: ActivatedRoute ) {
    // this.cliente = service.getCliente(); teste servico
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    
    /* forma que encontrei de resolver o problema
    let idParams: Observable<string> = this.activatedRoute.snapshot.params['id'];
    console.log(idParams);
    if(idParams){
      this.id = +idParams;
      this.service
        .getClientePorId(this.id)
        .subscribe(
          resposta => this.cliente = resposta,
          error => this.cliente = new Cliente());
    } */ 

    // forma do professor do curso
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id){
        this.service
        .getClientePorId(this.id)
        .subscribe(
          resposta => this.cliente = resposta,
          error => this.cliente = new Cliente());
      }
    })
  }

  onSubmit(){
    this.success = false;
    this.errors = [];
    if(this.id){
      this.service
        .atualizar(this.cliente)
        .subscribe ( response => {
          this.errors = [];
          this.successMessage = 'Cliente atualizado com sucesso!'
          this.success = true 
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
          if(this.errors.length == 0){
            this.errors = ['Erro ao tentar atualizar cliente!']
          }
        });
    } else {
      this.service
        .salvar(this.cliente)
        .subscribe( response => {
          this.errors = [];
          this.successMessage = 'Cliente salvo com sucesso!'
          this.success = true;
          this.cliente = response;
          if(this.cliente.id){
            this.id = this.cliente.id;
          }
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        });
    }
  }

  voltarParaLista(){
    this.router.navigate(['/clientes-list']);
  }

}
