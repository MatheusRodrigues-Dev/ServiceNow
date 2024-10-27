import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginainicialPageRoutingModule } from './paginainicial-routing.module';

import { PaginainicialPage } from './paginainicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginainicialPageRoutingModule
  ],
  declarations: [PaginainicialPage]
})
export class PaginainicialPageModule {}
