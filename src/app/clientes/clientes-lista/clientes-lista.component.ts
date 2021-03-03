import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSelecionado: Cliente = new Cliente();
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor( 
    private service : ClientesService, 
    private router : Router ) {

  }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe( response => this.clientes = response );
  }

  novoCadastro(){
    this.router.navigate(['/clientes-form']);
  }

  prepararDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
    this.mensagemSucesso = '';
  }

  deletarCliente(){
    // console.log(this.clienteSelecionado);
    this.service
      .deletar(this.clienteSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Sucesso: Cliente deletado!';
          this.ngOnInit();
        },
        error => this.mensagemErro = 'Erro: Ao tentar deletar o cliente!');
  }

}
