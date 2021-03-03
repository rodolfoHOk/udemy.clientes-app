import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicosPrestadosService } from '../../servicos-prestados.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';

@Component({
  selector: 'app-servicos-prestados-lista',
  templateUrl: './servicos-prestados-lista.component.html',
  styleUrls: ['./servicos-prestados-lista.component.css']
})
export class ServicosPrestadosListaComponent implements OnInit {

  nome: string = "";
  mes: number = 0;
  meses : number[] = [];
  lista : ServicoPrestadoBusca[] = [];
  servicoSelecionado: ServicoPrestado = new ServicoPrestado();
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor( private service : ServicosPrestadosService,
               private router : Router ) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
  }

  consultar(){
    this.mensagemErro = "";
    this.service
          .pesquisar(this.nome, this.mes)
          .subscribe( response => {
            this.lista = response;
            if( this.lista.length <= 0 ) {
              this.mensagemErro = "Nenhum registro encontrado!"
            }
          });
  }

  novoCadastro(){
    this.router.navigate(['/servicos-prestados-form']);
  }

  prepararDelecao(servico : ServicoPrestado){
    this.servicoSelecionado = servico;
  }

  deletarServico(){
    // Deletar do servidor
    this.service
        .deletar(this.servicoSelecionado)
        .subscribe(response => {
          this.mensagemErro = "";
          this.mensagemSucesso = "Sucesso: serviço prestado deletado!"
        }, error => {
          this.mensagemSucesso = "";
          this.mensagemErro = "Erro: Ao tentar deletar o serviço prestado!"
        });
    // deletar da tabela da página
    for (let i = 0; i < this.lista.length; ++i) {
      if (this.lista[i].id === this.servicoSelecionado.id) {
          this.lista.splice(i,1);
      }
    }
  }

}
