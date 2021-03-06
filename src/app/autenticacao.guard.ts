import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {
  
  constructor(
    private autenticacaoService : AutenticacaoService,
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      const autenticado = this.autenticacaoService.isAutenticado();
      if ( autenticado ) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
