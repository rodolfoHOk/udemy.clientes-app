import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from '../autenticacao.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ServicosPrestadosFormComponent } from './servicos-prestados-form/servicos-prestados-form.component';
import { ServicosPrestadosListaComponent } from './servicos-prestados-lista/servicos-prestados-lista.component';

const routes: Routes = [
  { path : 'servicos-prestados', component : LayoutComponent,
    canActivate : [AutenticacaoGuard], children: [
    { path: 'form', component: ServicosPrestadosFormComponent },
    { path: 'form/:id', component: ServicosPrestadosFormComponent },
    { path: 'lista', component: ServicosPrestadosListaComponent },
    { path: '', redirectTo: '/servicos-prestados/lista', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosPrestadosRoutingModule { }
