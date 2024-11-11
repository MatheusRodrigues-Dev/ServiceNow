import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-paginainicial',
  templateUrl: './paginainicial.page.html',
  styleUrls: ['./paginainicial.page.scss'],
})
export class PaginainicialPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    // Escutando eventos de navegação
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showSuccessMessageIfAvailable();
      }
    });
  }

  showSuccessMessageIfAvailable() {
    // Verifica se há uma mensagem de sucesso no localStorage
    const successMessage = localStorage.getItem('successMessage');

    if (successMessage) {
      // Exibe o alert de sucesso
      this.showSuccessAlert(successMessage);

      // Remove a mensagem de sucesso para evitar que o alerta apareça novamente
      localStorage.removeItem('successMessage');
    }
  }

  async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });

    await alert.present();
  }
}
