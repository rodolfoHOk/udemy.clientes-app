import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL : string = environment.apiUrlBase + '/api/clientes';

  constructor( private http : HttpClient ) { 

  }

  salvar( cliente : Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getClientePorId(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  } 

  atualizar( cliente : Cliente ) : Observable<any> { // any no caso porque api não retorna nada
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  deletar( cliente : Cliente ): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
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
