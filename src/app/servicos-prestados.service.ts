import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servicos-prestados/servicoPrestado';
import { ServicoPrestadoBusca } from './servicos-prestados/servicos-prestados-lista/servicoPrestadoBusca';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicosPrestadosService {

  apiUrl: string = environment.apiUrlBase + '/api/servicos-prestados';

  constructor( private http : HttpClient ) { }

  salvar( servicoPrestado : ServicoPrestado ) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiUrl, servicoPrestado)
  }

  pesquisar( nome: string, mes: number ) : Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams()
                              .set("nome", nome)
                              .set("mes", mes ? mes.toString() : '');
    const url = this.apiUrl + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }

  deletar( servico : ServicoPrestadoBusca ) : Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${servico.id}`);
  }

  atualizar( servico: ServicoPrestado ) : Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${servico.id}`, servico);
  }

  buscarPorId( id: number) : Observable<ServicoPrestadoBusca>{
    return this.http.get<ServicoPrestadoBusca>(`${this.apiUrl}/${id}`);
  }

}
