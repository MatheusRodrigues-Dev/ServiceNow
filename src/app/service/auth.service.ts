import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // Importação do operador tap
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://teste.smartsensordesign.com/public/api'; // Altere para a URL da sua API
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) { }

  // Função para login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Token recebido:', response.token); // Imprime o token no console
          console.log('Role recebido:', response.role); // Imprime o token no console
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.currentUserSubject.next(response.token);
          this.router.navigate(['/tabs']);
        }),
        catchError(error => {
          let errorMessage = '';
          if (error.error.errors.email) {
            // Se a resposta da API contém uma mensagem de erro
            errorMessage = error.error.errors.email;
          } else if (error.error.errors.password) {
            errorMessage = error.error.errors.password;
          } else {
            errorMessage = 'Ocorreu um erro durante o login. Tente novamente mais tarde.';
          }

          console.error('Erro no login:', error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  // Função para registro
  register(name: string, email: string, password: string, type: string, status: string): Observable<any> {
    return this.http.post<{ token: string, message: string, role: string, code:string }>(`${this.apiUrl}/register`, { name, email, password, type, status })
      .pipe(
        tap(response => {
          console.log('Registro realizado:', response.message); // Imprime mensagem de sucesso no console
          console.log('Token recebido:', response.token); // Imprime o token no console
          localStorage.setItem('token', response.token);
          console.log('Role recebido:', response.role); // Imprime o token no console
          localStorage.setItem('role', response.role);
          console.log('Code recebido:', response.code); // Imprime o token no console
          localStorage.setItem('code', response.code);
          console.log('email recebido:', email); // Imprime o token no console
          localStorage.setItem('email', email);
          this.currentUserSubject.next(response.token);
          this.router.navigate(['/codigoemail']);
        }),
        catchError(error => {
          let errorMessage = '';
          if (error.error.errors.name) { errorMessage = error.error.errors.name; }
          else if (error.error.errors.email) { errorMessage = error.error.errors.email; }
          else if (error.error.errors.password) { errorMessage = error.error.errors.password; }
          else if (error.error.errors.type) { errorMessage = error.error.errors.type; }
          else if (error.error.errors.status) { errorMessage = error.error.errors.status; }
          else { errorMessage = 'Ocorreu um erro durante o login. Tente novamente mais tarde.'; }
          console.error('Erro no registro:', error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  verifyCode(code: string): Observable<any> {
    // Recuperar o código e o email do localStorage
    const email = localStorage.getItem('email');

    // Enviar o código e o email para a API
    return this.http.post<{ message: string }>(`${this.apiUrl}/send-email`, { email, code })
      .pipe(
        tap((response) => {
          console.log('Código verificado:', response.message); // Imprime mensagem de sucesso no console
          // Add any additional success handling logic here
        }),
        catchError(error => {
          console.error('Erro ao verificar código:', error);
          return throwError(() => new Error('Ocorreu um erro durante a verificação do código. Tente novamente mais tarde.'));
        })
      );
  }

  // Função para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<{message: string}>(`${this.apiUrl}/logout`, {}, { headers }) // Note que o corpo da requisição é um objeto vazio {}
      .pipe(
        tap((response) => {
          console.log('Logout realizado:', response.message); // Imprime mensagem de sucesso no console
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.currentUserSubject.next(null);
          this.router.navigate(['/intro']);
        }),
        catchError(error => {
          console.error('Erro no logout:', error);
          return throwError(() => new Error('Ocorreu um erro durante o logout. Tente novamente mais tarde.'));
        })
      ).subscribe();
  }

}
