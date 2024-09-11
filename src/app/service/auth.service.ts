import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // Importação do operador tap
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Altere para a URL da sua API
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) { }

  // Função para login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Token recebido:', response.token); // Imprime o token no console
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.token);
          this.router.navigate(['/tabs']);
        }),
        catchError(error => {
          let errorMessage = 'Ocorreu um erro durante o login. Tente novamente mais tarde.';
          if (error.error && error.error.message) {
            // Se a resposta da API contém uma mensagem de erro
            errorMessage = error.error.message;
          }
          console.error('Erro no login:', error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  // Função para registro
  register(name: string, email: string, password: string, type: string, status: string): Observable<any> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, { name, email, password, type, status })
      .pipe(
        tap(response => {
          console.log('Registro realizado:', response.message); // Imprime mensagem de sucesso no console
        }),
        catchError(error => {
          let errorMessage = 'Ocorreu um erro durante o registro. Tente novamente mais tarde.';
          if (error.error && error.error.message) {
            // Se a resposta da API contém uma mensagem de erro
            errorMessage = error.error.message;
          }
          console.error('Erro no registro:', error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  // Função para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Função para deslogar o usuário
  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
