import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // Importação do operador tap
import { Router, NavigationExtras } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://teste.smartsensordesign.com/api'; // Altere para a URL da sua API
  // private apiUrl = 'http://127.0.0.1:8000/api'; // Altere para a URL da sua API
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public servicos: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  // Função para login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, role: string, user_id: string, user_name:string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          const role = response.role; // Supondo que o role venha nessa propriedade
          console.log('Token recebido:', response.token); // Imprime o token no console
          console.log('Role recebido:', response.role); // Imprime o token no console
          console.log('Role recebido:', response.user_id); // Imprime o token no console
          console.log('Role recebido:', response.user_name); // Imprime o token no console
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('id', response.user_id);
          localStorage.setItem('name', response.user_name);
          this.currentUserSubject.next(response.token);
          // this.router.navigate(['/tabs']);

          if (role === 'cliente') {
            this.router.navigate(['/cliente']);  // Redireciona para a página do cliente
          } else if (role === 'prestador') {
            this.router.navigate(['/prestador']);  // Redireciona para a página do prestador
          } else {
            // Lida com outros casos, se necessário
            console.log('Role não reconhecido');
          }
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
    return this.http.post<{ token: string, message: string, role: string, code: string, user_name:string }>(`${this.apiUrl}/register`, { name, email, password, type, status })
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
          console.log('email recebido:', response.user_name); // Imprime o token no console
          localStorage.setItem('email', response.user_name);
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

    this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, { headers }) // Note que o corpo da requisição é um objeto vazio {}
      .pipe(
        tap((response) => {
          console.log('Logout realizado:', response.message);

          // Limpar todos os caches e dados armazenados
          localStorage.clear(); // Remove todos os dados do localStorage
          sessionStorage.clear(); // Remove todos os dados do sessionStorage
          caches.keys().then((cacheNames) => { // Limpa os caches de navegação
            cacheNames.forEach((cacheName) => {
              caches.delete(cacheName);
            });
          });

          // Atualizar estado do usuário e redirecionar
          this.currentUserSubject.next(null);
          this.router.navigate(['/intro']);
        }),
        catchError(error => {
          console.error('Erro no logout:', error);
          return throwError(() => new Error('Ocorreu um erro durante o logout. Tente novamente mais tarde.'));
        })
      ).subscribe();
  }


  loadServicos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('role');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/lista-servicos`, { headers }).pipe(
      tap((data) => {
        this.servicos = data;
        console.log('Serviços carregados com sucesso:', this.servicos.length);

        // Redireciona baseado no tipo de usuário
        if (userType === 'cliente') {
          this.router.navigate(['/cliente/solicitacoes-servico']);
        } else if (userType === 'prestador') {
          this.router.navigate(['/prestador/disponibilidade-servico']);  // Redireciona para a página do prestador
        }
      }),
      catchError(error => {
        console.error('Erro ao carregar serviços:', error);
        if (error.status === 401) {
          // Redireciona baseado no tipo de usuário
          if (userType === 'cliente') {
            this.router.navigate(['/cliente/solicitacoes-servico']);
          } else if (userType === 'prestador') {
            this.router.navigate(['/prestador/disponibilidade-servico']);  // Redireciona para a página do prestador
          }
        }
        return throwError(() => new Error('Ocorreu um erro ao carregar os serviços. Tente novamente mais tarde.'));
      })
    );
  }

  loadPrestadores(selectedDateTime: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('role');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const requestBody = { data_hora: selectedDateTime }; // Corpo da requisição com a data selecionada
    console.log(requestBody);

    return this.http.post<{ success: string; message: string; prestadores: any[]; }>(
      `${this.apiUrl}/listar-disponibilidade`,
      requestBody,
      { headers }
    ).pipe(
      tap((response) => {
        const prestadores = response.prestadores;
        console.log('Prestadores:', prestadores);

        // Redireciona baseado no tipo de usuário
        if (userType === 'cliente') {
          this.router.navigate(['/cliente/disponibilidade-servico']);
        }
      }),
      catchError(error => {
        console.error('Erro ao carregar prestadoes:', error);
        let errorMessage = '';
        if (error.error.message) {
          // Se a resposta da API contém uma mensagem de erro
          errorMessage = error.error.message;
        } else {
          errorMessage = 'Ocorreu um erro durante o carregar os prestadores. Tente novamente mais tarde.';
        }

        console.error('Erro no prestador de serviço:', error);
        return throwError(() => new Error(errorMessage));
        // return throwError(() => new Error('Ocorreu um erro ao carregar os prestadores. Tente novamente mais tarde.'));
      })
    );
  }

  getServicos() {
    return this.servicos; // Método para acessar os serviços carregados
  }

  registerService(
    prestadorID: string,
    servicoId: number,
    descricao: string,
    status: string,
    data_esperada: string,
    disponibilidade_id: number,
    prioridade: string,
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('id');

    if (!token || !userID) {
      console.error('Token ou userID está faltando.');
      return throwError(() => new Error('Token ou ID do usuário ausente'));
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const requestBody = {
      cliente_id: Number(userID),
      prestador_email: prestadorID,
      servico_id: servicoId,
      descricao: descricao,
      status: status,
      data_esperada: data_esperada,
      disponibilidade_id: disponibilidade_id,
      prioridade: prioridade,
    };

    return this.http.post<any>(`${this.apiUrl}/solicitacoes-servico`, requestBody, { headers }).pipe(
      tap((response) => {
        console.log('Response:', response);

        // Armazena a mensagem de sucesso no localStorage
        localStorage.setItem('successMessage', 'Serviço registrado com sucesso!');

        // Navega para a página inicial
        this.router.navigate(['/cliente/paginainicial']);
      }),
      catchError(error => {
        console.error('Erro ao registrar serviço:', error);
        if (error.status === 401) {
          // Lógica de redirecionamento para usuários não autorizados
        }
        return throwError(() => new Error('Erro ao registrar serviço'));
      })
    );
  }

  registerDisponibilidadeServico(
    data: string,
    servico_id: number,
    status: string,
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('id');

    if (!token || !userID) {
      console.error('Token ou userID está faltando.');
      return throwError(() => new Error('Token ou ID do usuário ausente'));
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const requestBody = {
      prestador_id: Number(userID),
      status: status,
      data: data,
      servico_id: servico_id,
    };

    return this.http.post<any>(`${this.apiUrl}/disponibilidade-servicos`, requestBody, { headers }).pipe(
      tap((response) => {
        console.log('Response:', response);

        // Armazena a mensagem de sucesso no localStorage
        localStorage.setItem('successMessage', 'Serviço registrado com sucesso!');

        // Navega para a página inicial
        this.router.navigate(['/prestador/paginainicial']);
      }),
      catchError(error => {
        console.error('Erro ao registrar serviço:', error);
        if (error.status === 401) {
          // Lógica de redirecionamento para usuários não autorizados
        }
        return throwError(() => new Error('Erro ao registrar serviço'));
      })
    );
  }

}
