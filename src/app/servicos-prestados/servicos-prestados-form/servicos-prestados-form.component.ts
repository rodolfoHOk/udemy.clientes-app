import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicosPrestadosService } from '../../servicos-prestados.service';

@Component({
  selector: 'app-servicos-prestados-form',
  templateUrl: './servicos-prestados-form.component.html',
  styleUrls: ['./servicos-prestados-form.component.css']
})
export class ServicosPrestadosFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico : ServicoPrestado;
  success: boolean = false;
  successMessage = '';
  errors: string[] = [];
  id: number = 0;
  preSelectCliente: any = "";

  constructor(
    private clientesService : ClientesService,
    private service : ServicosPrestadosService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) { 
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    // carregar lista de clientes
    this.clientesService
          .getClientes()
          .subscribe( response => this.clientes = response );
    // carregar o serviço explicito da url se tiver
    this.activatedRoute
          .params
          .subscribe(urlParams => {
            this.id = urlParams['id'];
            if(this.id){
              this.service
                    .buscarPorId(this.id)
                    .subscribe( response => {
                      this.servico = new ServicoPrestado();
                      this.servico.id = response.id;
                      this.servico.descricao = response.descricao;
                      this.servico.data = response.data;
                      this.servico.preco = response.valor?.toString();
                      this.servico.idCliente = response.cliente?.id;
                      this.preSelectCliente = response.cliente?.id;
                      console.log(response.valor);
                    }, error => this.servico = new ServicoPrestado() );
            };
          });
  }

  onSubmit(){
    // console.log(this.servico);
    this.success = false;
    this.errors = [];
    if(this.id){
      this.service
        .atualizar(this.servico)
        .subscribe( response => {
          // console.log(response);
          this.errors = [];
          this.successMessage = 'Serviço prestado atualizado com sucesso!'
          this.success = true;
          this.servico = new ServicoPrestado(); // para quando salvar limpa o formulario para cadastrar outro
        }, errors => {
          // console.log(errors);
          this.success = false;
          this.errors = errors.error.errors;
        });
    } else {
      this.service
        .salvar(this.servico)
        .subscribe( response => {
          // console.log(response);
          this.errors = [];
          this.successMessage = 'Serviço prestado salvo com sucesso!'
          this.success = true;
          this.servico = new ServicoPrestado(); // para quando salvar limpa o formulario para cadastrar outro
        }, errors => {
          // console.log(errors);
          this.success = false;
          this.errors = errors.error.errors;
        });
    }
  }

  voltarLista(){
    this.router.navigate(['/servicos-prestados-list']);
  }

}
