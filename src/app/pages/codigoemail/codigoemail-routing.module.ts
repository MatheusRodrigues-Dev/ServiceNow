import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoemailPage } from './codigoemail.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoemailPageRoutingModule {}
