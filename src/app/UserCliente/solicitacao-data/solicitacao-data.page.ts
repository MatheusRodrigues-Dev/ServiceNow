import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao-data',
  templateUrl: './solicitacao-data.page.html',
  styleUrls: ['./solicitacao-data.page.scss'],
})
export class SolicitacaoDataPage implements OnInit {
  dados: any;
  selectedDateTime: string =''; // Variável para armazenar a data e hora formatada

  constructor(private router: Router) { }

  ngOnInit() {
    // Acesse os dados passados pelo estado
    this.dados = history.state.dados;
    console.log(this.dados); // Verifique se os dados foram recebidos corretamente

    // Agora você pode acessar os valores individualmente, por exemplo:
    const servico = this.dados?.servico;
    const prioridade = this.dados?.prioridade;
    const descricao = this.dados?.descricao;
  }

  // Função para voltar à página anterior (login)
  voltar() {
    this.router.navigate(['cliente/solicitacoes-servico']);
  }

  // Função chamada ao selecionar a data e hora
  onDateTimeChange(event: any) {
    const selectedISODateTime = event.detail.value; // ISO string de data/hora
    const formattedDateTime = this.formatDateTime(selectedISODateTime);
    this.selectedDateTime = formattedDateTime;
  }

  // Formata a data para "YYYY-MM-DD HH:mm:ss"
  formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00'; // Ajuste para segundos, se necessário

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  continuar() {
    console.log('Data e hora selecionadas:', this.selectedDateTime);
    // Aqui, você pode armazenar a data ou usá-la conforme necessário
  }
}
