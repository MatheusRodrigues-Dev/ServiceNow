import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  type: string = 'cliente';
  status: string = 'pendente';
  mostrarpassword: boolean = false;

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async registerUser() {
    try {
      await this.authService.register(this.name, this.email, this.password, this.type, this.status).toPromise();
      // Sucesso no registro, pode adicionar lógica adicional aqui
      console.log('Registro bem-sucedido!');
      this.router.navigate(['/tabs']);
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



  // Função para lidar com a entrada de dados
  input(campo: string, event: any) {
    const valor = event.target.value;
    switch (campo) {
      case 'name':
        this.name = valor;
        break;
      case 'email':
        this.email = valor;
        break;
      case 'password':
        this.password = valor;
        break;
    }
  }

  // Função para alternar a visibilidade da password
  alternarVisibilidadepassword() {
    this.mostrarpassword = !this.mostrarpassword;
  }

  // Função para registrar o usuário
  registrarUsuario() {
    if (this.name && this.email && this.password) {
      // Aqui você pode adicionar lógica para enviar os dados para o servidor
      // e tratar o resultado

      console.log('name:', this.name);
      console.log('Email:', this.email);
      console.log('password:', this.password);

      // Após o registro bem-sucedido, redirecionar para a página de login ou outra página
      this.router.navigate(['/login']);
    } else {
      // Exemplo de validação básica
      alert('Por favor, preencha todos os campos.');
    }
  }

  // Função para voltar à página anterior (login)
  voltar() {
    this.router.navigate(['/intro']);
  }
}
