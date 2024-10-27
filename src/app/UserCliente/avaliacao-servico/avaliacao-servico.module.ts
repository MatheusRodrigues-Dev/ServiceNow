import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliacaoServicoPageRoutingModule } from './avaliacao-servico-routing.module';

import { AvaliacaoServicoPage } from './avaliacao-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliacaoServicoPageRoutingModule
  ],
  declarations: [AvaliacaoServicoPage]
})
export class AvaliacaoServicoPageModule {}
