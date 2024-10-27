import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.page.html',
  styleUrls: ['./prestador.page.scss'],
})
export class PrestadorPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }

}
