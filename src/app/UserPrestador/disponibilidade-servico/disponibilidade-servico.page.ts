import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-disponibilidade-servico',
  templateUrl: './disponibilidade-servico.page.html',
  styleUrls: ['./disponibilidade-servico.page.scss'],
})
export class DisponibilidadeServicoPage implements OnInit {
  servicos: any[] = []; // Array para armazenar serviços
  selectedServico: any; // Para armazenar o serviço selecionado
  selectedPrioridade: string = ''; // Inicializando com uma string vazia
  // descricao: string = ''; // Inicializando com uma string vazia
  selectedDateTime: string = ''; // Variável para armazenar a data e hora formatada

  constructor(
    private router: Router,
    private serviceService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
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
    if (!this.selectedServico || !this.selectedPrioridade) {
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
      message: 'Registrando Serviço...',
      spinner: 'crescent'
    });

    // Continue se todos os campos estiverem preenchidos
    const dados = {
      servico: this.selectedServico,
      prioridade: this.selectedPrioridade,
      selectedDateTime: this.selectedDateTime
    };

    console.log('Dados enviados:', dados.servico['id']);
    // Navegar para a próxima página ou salvar os dados conforme necessário
    // Navegue para a próxima página, passando os dados como parâmetros
    try {
      await loading.present();

      await this.serviceService.registerDisponibilidadeServico(
        dados.selectedDateTime,
        dados.servico['id'], // Passa o e-mail do prestador para a função,
        dados.prioridade
      ).toPromise();

      console.log('Registro bem-sucedido!');
      this.router.navigate(['/prestador/paginainicial']);

    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      this.showErrorAlert(errorMessage);

    } finally {
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
      cssClass: 'custom-alert'
    });

    await alert.present();
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
}
