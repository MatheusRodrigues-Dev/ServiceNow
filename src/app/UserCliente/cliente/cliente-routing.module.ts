import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePage,
    children: [
      {
        path: 'paginainicial',
        loadChildren: () => import('../paginainicial/paginainicial.module').then( m => m.PaginainicialPageModule)
      },
      {
        path: 'solicitacoes-servico',
        loadChildren: () => import('../solicitacoes-servico/solicitacoes-servico.module').then( m => m.SolicitacoesServicoPageModule)
      },
      {
        path: 'avaliacao-servico',
        loadChildren: () => import('../avaliacao-servico/avaliacao-servico.module').then( m => m.AvaliacaoServicoPageModule)
      },
      {
        path: 'solicitacao-data',
        loadChildren: () => import('../solicitacao-data/solicitacao-data.module').then( m => m.SolicitacaoDataPageModule)
      },
      {
        path: '',
        redirectTo: '/cliente/paginainicial',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
