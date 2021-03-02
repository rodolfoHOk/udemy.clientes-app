import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http : HttpClient ) { 

  }

  salvar( cliente : Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  getClientePorId(id: number): Observable<Cliente> {
    return this.http.get<any>(`http://localhost:8080/api/clientes/${id}`);
  } 

  atualizar( cliente : Cliente ) : Observable<any> { // any no caso porque api não retorna nada
    return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`, cliente)
  }

  deletar( cliente : Cliente ): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/clientes/${cliente.id}`);
  }

  /* Teste lista clentes
  getClientes() : Cliente[] {
    let cliente1 = new Cliente();
    cliente1.id = 1;
    cliente1.nome = 'Teste Lista Cliente';
    cliente1.cpf = '12345678901';
    cliente1.dataCadastro = '31/07/2020';
    return [cliente1];
  } */
  /* Teste - Ok
  getCliente() : Cliente {
    let cliente : Cliente = new Cliente();
    cliente.id = 1001;
    cliente.nome = "Fulano de Tal";
    cliente.cpf = "12345678901";
    cliente.dataCadastro = "31/07/2001";
    return cliente;
  } */
}
