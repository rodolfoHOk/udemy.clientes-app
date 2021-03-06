import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  apiUrl : string = environment.apiUrlBase + '/api/usuarios';
  tokenUrl : string = environment.apiUrlBase + environment.obterTokenUrl;
  clientId : string = environment.clientId;
  clientSecret : string = environment.clientSecret;
  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor( private http : HttpClient ) { }

  obterToken() : any {
    const tokenString = localStorage.getItem("access_token");
    if ( tokenString ) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if ( token ) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;  
  }

  isAutenticado() : boolean {
    // return true; // teste 1
    // return false; // teste 2
    const token = this.obterToken();
    if ( token ) {
      const expirado : boolean = this.jwtHelper.isTokenExpired(token);
      return !expirado;
    }
    return false;
  }

  salvar ( usuario: Usuario ) : Observable<any> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  tentarLogar( username: string, password: string ) : Observable<any>{
    let params : HttpParams = new HttpParams()
                                    .set('username', username)
                                    .set('password', password)
                                    .set('grant_type', 'password');

    const headers : HttpHeaders = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    });

    return this.http.post<any>( this.tokenUrl, params.toString(), { headers } );
  }
  
}
