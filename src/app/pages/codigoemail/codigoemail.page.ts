import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service'; // Substitua com o caminho correto do seu serviço de autenticação
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-codigoemail',
  templateUrl: './codigoemail.page.html',
  styleUrls: ['./codigoemail.page.scss'],
})
export class CodigoemailPage implements OnInit {
  code: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {

  }

  async verifyCode() {
    try {
      const response = await this.authService.verifyCode(this.code).toPromise();
      // console.log(response.message)
      if (response.message) {
        await this.presentToast('Código verificado com sucesso!', 'success');

        // Navegar com base no role do usuário
        const role = localStorage.getItem('role');;
        if (role === 'cliente') {
          this.router.navigate(['/cliente']);  // Redireciona para a página do cliente
        } else if (role === 'prestador') {
          this.router.navigate(['/prestador']);  // Redireciona para a página do prestador
        } else {
          console.log('Role não reconhecido');
          this.router.navigate(['/tabs']); // Caso o role não seja identificado, vai para /tabs
        }

      } else {
        await this.presentToast('Código inválido. Tente novamente.', 'danger');
      }
    } catch (error) {
      await this.presentToast('Ocorreu um erro ao verificar o código. Tente novamente.', 'danger');
    }
  }


  // async resendCode() {
  //   try {
  //     await this.authService.resendCode().toPromise();
  //     await this.presentToast('Código reenviado com sucesso!', 'success');
  //   } catch (error) {
  //     await this.presentToast('Erro ao reenviar o código. Tente novamente.', 'danger');
  //   }
  // }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }

  // Função para voltar à página anterior (login)
  voltar() {
    this.router.navigate(['/register']);
  }
}
