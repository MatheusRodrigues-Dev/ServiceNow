import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginainicialPage } from './paginainicial.page';

const routes: Routes = [
  {
    path: '',
    component: PaginainicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginainicialPageRoutingModule {}
