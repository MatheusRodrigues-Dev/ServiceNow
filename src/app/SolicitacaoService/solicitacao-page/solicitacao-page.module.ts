import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoPagePageRoutingModule } from './solicitacao-page-routing.module';

import { SolicitacaoPagePage } from './solicitacao-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoPagePageRoutingModule
  ],
  declarations: [SolicitacaoPagePage]
})
export class SolicitacaoPagePageModule {}
