import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoDataPageRoutingModule } from './solicitacao-data-routing.module';

import { SolicitacaoDataPage } from './solicitacao-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoDataPageRoutingModule
  ],
  declarations: [SolicitacaoDataPage]
})
export class SolicitacaoDataPageModule {}
