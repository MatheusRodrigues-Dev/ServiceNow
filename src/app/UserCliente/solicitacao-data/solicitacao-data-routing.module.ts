import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoDataPage } from './solicitacao-data.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoDataPageRoutingModule {}
