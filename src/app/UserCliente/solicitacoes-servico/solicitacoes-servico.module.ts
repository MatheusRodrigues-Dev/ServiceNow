import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacoesServicoPageRoutingModule } from './solicitacoes-servico-routing.module';

import { SolicitacoesServicoPage } from './solicitacoes-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacoesServicoPageRoutingModule
  ],
  declarations: [SolicitacoesServicoPage]
})
export class SolicitacoesServicoPageModule {}
