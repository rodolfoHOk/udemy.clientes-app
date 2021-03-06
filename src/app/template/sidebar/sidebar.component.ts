import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import * as jQuery from 'jquery'; // contornando erro do import
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  usuarioLogado: string = ""

  constructor(
    private autenticacaoService : AutenticacaoService,
    private router : Router
  ) { }

  ngAfterViewInit() {

    this.usuarioLogado = this.autenticacaoService.getUsuarioAutenticado();

    // para funcionar o botão de menu da navbar para abrir e fechar a sidebar
    (function($) {
      "use strict";
  
      // Add active state to sidbar nav links
      var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
          $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
              if (this.getAttribute("href") === path) { // contornar erro ts2339
                  $(this).addClass("active");
              }
          });
  
      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sb-sidenav-toggled");
      });
    })(jQuery);
  }

  deslogar(){
    this.autenticacaoService.encerrarSessao();
    this.router.navigate(['/login']);
  }

}
