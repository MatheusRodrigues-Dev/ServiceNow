import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisponibilidadeServicoPageRoutingModule } from './disponibilidade-servico-routing.module';

import { DisponibilidadeServicoPage } from './disponibilidade-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisponibilidadeServicoPageRoutingModule
  ],
  declarations: [DisponibilidadeServicoPage]
})
export class DisponibilidadeServicoPageModule {}
