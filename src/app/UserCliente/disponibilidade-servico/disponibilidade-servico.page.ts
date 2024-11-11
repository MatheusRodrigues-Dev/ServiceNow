import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-disponibilidade-servico',
  templateUrl: './disponibilidade-servico.page.html',
  styleUrls: ['./disponibilidade-servico.page.scss'],
})
export class DisponibilidadeServicoPage implements OnInit {
  dados: any;
  selectedDateTime: any;
  prestadores: any[] = [];
  status: string = 'pendente';

  constructor(
    private router: Router,
    private serviceService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.dados = history.state.dados;
    this.selectedDateTime = history.state.selectedDateTime;
    console.log('Dados recebidos:', this.dados.descricao);
    console.log('Dados recebidos:', this.dados.prioridade);
    console.log('Data e hora selecionada:', this.selectedDateTime);
  }

  selectedIds: Set<number> = new Set();

  toggleSelection(id: number) {
    this.selectedIds.clear();
    this.selectedIds.add(id);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }

  async continuar() {
    const selectedPrestador = Array.from(this.selectedIds)[0]; // Obtém o ID do prestador selecionado
    const prestador = this.prestadores.find(p => p.id === selectedPrestador); // Encontra o prestador pelo ID selecionado

    if (!prestador) {
      this.showErrorAlert('Nenhum prestador selecionado.');
      return;
    }

    const prestadorEmail = prestador.email; // Obtém o e-mail do prestador
    console.log('E-mail do prestador selecionado:', prestadorEmail);

    const loading = await this.loadingController.create({
      message: 'Registrando Serviço...',
      spinner: 'crescent'
    });

    try {
      await loading.present();

      await this.serviceService.registerService(
        prestadorEmail,
        2, // Passa o e-mail do prestador para a função,
        this.dados.descricao,
        this.status,
        this.selectedDateTime,
        selectedPrestador,
        this.dados.prioridade,
      ).toPromise();

      console.log('Registro bem-sucedido!');
      this.router.navigate(['/cliente/paginainicial']);

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

  ionViewWillEnter() {
    this.serviceService.loadPrestadores(this.selectedDateTime).subscribe({
      next: (data) => {
        this.prestadores = data.prestadores;
        console.log('Prestadores carregados com sucesso:', this.prestadores);
      },
      error: (error) => {
        console.error('Erro ao carregar prestadores:', error);
      }
    });
  }

  voltar() {
    this.router.navigate(['cliente/solicitacao-data']);
  }
}
