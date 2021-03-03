import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosPrestadosFormComponent } from './servicos-prestados-form/servicos-prestados-form.component';
import { ServicosPrestadosListaComponent } from './servicos-prestados-lista/servicos-prestados-lista.component';

const routes: Routes = [
  { path: 'servicos-prestados-form', component: ServicosPrestadosFormComponent },
  { path: 'servicos-prestados-form/:id', component: ServicosPrestadosFormComponent },
  { path: 'servicos-prestados-list', component: ServicosPrestadosListaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosPrestadosRoutingModule { }
