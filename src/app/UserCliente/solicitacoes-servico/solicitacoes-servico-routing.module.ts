import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacoesServicoPage } from './solicitacoes-servico.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacoesServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacoesServicoPageRoutingModule {}
