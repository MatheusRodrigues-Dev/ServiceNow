import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.page.html',
  styleUrls: ['./cadastrar-servico.page.scss'],
})
export class CadastrarServicoPage implements OnInit {
  gruposServicos: any[] = []; // Array para armazenar serviços
  servicos: any[] = []; // Array para armazenar serviços
  selectedGrupoServico: any; // Para armazenar o serviço selecionado
  nomeServico: string = ''; // Para armazenar o serviço selecionado
  descricao: string = ''; // Inicializando com uma string vazia
  selectedPayment: string = '';

  constructor(
    private router: Router,
    private serviceService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.serviceService.loadGrupoServicos().subscribe(
      (data: any[]) => {
        this.gruposServicos = data; // Atualiza a lista de serviços quando a chamada for concluída
        console.log(this.gruposServicos);
      },
      error => {
        console.error('Erro ao carregar serviços', error); // Tratamento de erro
      }
    );
  }

  async cadastrar() {
    if (!this.nomeServico || !this.selectedGrupoServico || !this.descricao.trim()) {
      // Exibir mensagem de erro se algum campo estiver vazio
      const alert = await this.alertController.create({
        header: 'Campos obrigatórios',
        message: 'Por favor, preencha todos os campos antes de continuar.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cadastrando Serviço...',
      spinner: 'crescent'
    });
    // Continue se todos os campos estiverem preenchidos
    const dados = {
      servico: this.nomeServico,
      prioridade: this.selectedGrupoServico,
      descricao: this.descricao,
    };

    console.log('Dados enviados:', dados);

    try {
      await loading.present();

      await this.serviceService.vincularServico(dados.servico, dados.descricao, dados.prioridade['id']).toPromise();
      // Sucesso no login, pode adicionar lógica adicional aqui
      console.log('Registro bem-sucedido!');
      this.router.navigate(['/prestador/paginainicial']);
    } catch (error) {
      // Exibir mensagem de erro
      const errorMessage = this.getErrorMessage(error);
      this.showErrorAlert(errorMessage);
    } finally {
      // Garantir que o loading será sempre fechado
      loading.dismiss();
    }
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message || 'Ocorreu um erro inesperado.';
    }
    return 'Ocorreu um erro inesperado.';
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert' // Adicione uma classe CSS personalizada
    });

    await alert.present();
  }

  selectPayment(payment: string) {
    this.selectedPayment = payment;
  }
}
