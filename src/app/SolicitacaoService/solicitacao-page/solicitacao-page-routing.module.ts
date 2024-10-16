import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoPagePage } from './solicitacao-page.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoPagePageRoutingModule {}
