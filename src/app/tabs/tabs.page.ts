import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Ajuste o caminho conforme necessário


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }

}
