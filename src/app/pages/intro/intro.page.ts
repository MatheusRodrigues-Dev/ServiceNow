import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logarUsuario(){
    this.router.navigate(['/login']); // Redireciona para a página de registro
    }

  cadastrar() {
    this.router.navigate(['/register']); // Redireciona para a página de registro
  }
}
