import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { ClientesModule } from './clientes/clientes.module';
import { ServicosPrestadosModule } from './servicos-prestados/servicos-prestados.module';

import { HomeComponent } from './home/home.component';

import { ClientesService  } from './clientes.service';
import { ServicosPrestadosService } from './servicos-prestados.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    ServicosPrestadosModule
  ],
  providers: [
    ClientesService,
    ServicosPrestadosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
