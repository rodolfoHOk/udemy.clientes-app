import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './login/registrar/registrar.component';
import { AutenticacaoGuard } from './autenticacao.guard';

const routes: Routes = [
  { path: 'login', component : LoginComponent },
  { path: 'registrar', component : RegistrarComponent },
  { path : '', component : LayoutComponent, children: [
    { path : 'home', component : HomeComponent, canActivate : [AutenticacaoGuard] },
    { path : '', redirectTo: '/home', pathMatch : 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
