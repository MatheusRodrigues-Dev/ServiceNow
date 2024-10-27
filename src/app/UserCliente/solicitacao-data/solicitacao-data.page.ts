import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao-data',
  templateUrl: './solicitacao-data.page.html',
  styleUrls: ['./solicitacao-data.page.scss'],
})
export class SolicitacaoDataPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Função para voltar à página anterior (login)
  voltar() {
    this.router.navigate(['cliente/solicitacoes-servico']);
  }
}
