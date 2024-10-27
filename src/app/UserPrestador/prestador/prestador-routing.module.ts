import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestadorPage } from './prestador.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadorPage,
    children: [
      {
        path: 'paginainicial',
        loadChildren: () => import('../paginainicial/paginainicial.module').then(m => m.PaginainicialPageModule)
      },
      {
        path: 'avaliacao-servico',
        loadChildren: () => import('../avaliacao-servico/avaliacao-servico.module').then(m => m.AvaliacaoServicoPageModule)
      },
      {
        path: 'disponibilidade-servico',
        loadChildren: () => import('../disponibilidade-servico/disponibilidade-servico.module').then(m => m.DisponibilidadeServicoPageModule)
      },
      {
        path: '',
        redirectTo: '/prestador/paginainicial',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestadorPageRoutingModule { }
