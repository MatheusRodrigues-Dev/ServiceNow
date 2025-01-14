import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacao-servico',
  templateUrl: './avaliacao-servico.page.html',
  styleUrls: ['./avaliacao-servico.page.scss'],
})
export class AvaliacaoServicoPage implements OnInit {
  userName: string = '';

  constructor() { }

  ngOnInit() {
    const nameUser = localStorage.getItem('name');
    this.userName = nameUser || 'Usuário'
  }

}
