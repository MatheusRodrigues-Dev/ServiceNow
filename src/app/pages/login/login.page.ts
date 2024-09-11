import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  contato: string = '';
  senha: string = '';
  mostrarSenha: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
  }

  voltar() {
    this.router.navigate(['/intro']); // Redireciona para a página de registro
  }

  input(campo: string, event: any) {
    if (campo === 'contato') {
      this.contato = event.target.value;
    } else if (campo === 'senha') {
      this.senha = event.target.value;
    }
  }

  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  async logarUsuario() {
    try {
      await this.authService.login(this.email, this.password).toPromise();
      // Sucesso no login, pode adicionar lógica adicional aqui
      console.log('Login bem-sucedido!');
    } catch (error) {
      // Exibir mensagem de erro
      const errorMessage = this.getErrorMessage(error);
      this.showErrorAlert(errorMessage);
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
  resetar() {
    // Lógica para resetar a senha
  }

  continuarComGoogle() {
    // Lógica para login com Google
  }

  continuarComFacebook() {
    // Lógica para login com Facebook
  }

  cadastrar() {
    this.router.navigate(['/register']); // Redireciona para a página de registro
  }
}
