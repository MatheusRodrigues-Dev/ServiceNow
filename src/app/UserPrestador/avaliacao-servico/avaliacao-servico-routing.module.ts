import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliacaoServicoPage } from './avaliacao-servico.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliacaoServicoPageRoutingModule {}
