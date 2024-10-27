import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-solicitacoes-servico',
  templateUrl: './solicitacoes-servico.page.html',
  styleUrls: ['./solicitacoes-servico.page.scss'],
})
export class SolicitacoesServicoPage implements OnInit {
  servicos: any[] = []; // Array para armazenar serviços
  selectedServico: any; // Para armazenar o serviço selecionado
  selectedPrioridade: string = ''; // Inicializando com uma string vazia
  descricao: string = ''; // Inicializando com uma string vazia
  
  constructor(private router: Router, private serviceService: AuthService) { }

  ngOnInit() {
    this.serviceService.loadServicos().subscribe(
      (data: any[]) => {
        this.servicos = data; // Atualiza a lista de serviços quando a chamada for concluída
        console.log(this.servicos);
      },
      error => {
        console.error('Erro ao carregar serviços', error); // Tratamento de erro
      }
    );
  }

  continuar() {
    // Crie um objeto com os dados que deseja passar
    const dados = {
      servico: this.selectedServico,
      prioridade: this.selectedPrioridade,
      descricao: this.descricao,
    };

    // Navegue para a próxima página, passando os dados como parâmetros
    this.router.navigate(['cliente/solicitacao-data'], { state: { dados } });
  }

}
