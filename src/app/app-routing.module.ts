import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'codigoemail',
    loadChildren: () => import('./pages/codigoemail/codigoemail.module').then( m => m.CodigoemailPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./UserCliente/cliente/cliente.module').then( m => m.ClientePageModule),
    canActivate:  [AuthGuard]
  },
  {
    path: 'prestador',
    loadChildren: () => import('./UserPrestador/prestador/prestador.module').then( m => m.PrestadorPageModule),
    canActivate:  [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
