import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController } from '@ionic/angular';


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

  constructor(
    private router: Router,
    private serviceService: AuthService,
    private alertController: AlertController
  ) { }

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

  async continuar() {
    if (!this.selectedServico || !this.selectedPrioridade || !this.descricao.trim()) {
      // Exibir mensagem de erro se algum campo estiver vazio
      const alert = await this.alertController.create({
        header: 'Campos obrigatórios',
        message: 'Por favor, preencha todos os campos antes de continuar.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Continue se todos os campos estiverem preenchidos
    const dados = {
      servico: this.selectedServico,
      prioridade: this.selectedPrioridade,
      descricao: this.descricao,
    };

    console.log('Dados enviados:', dados);
    // Navegar para a próxima página ou salvar os dados conforme necessário
    // Navegue para a próxima página, passando os dados como parâmetros
    this.router.navigate(['cliente/solicitacao-data'], { state: { dados } });
    // Limpar os campos após a navegação
    this.selectedServico = '';
    this.selectedPrioridade = '';
    this.descricao = '';
  }

}
