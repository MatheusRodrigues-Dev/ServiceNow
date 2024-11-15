import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarServicoPageRoutingModule } from './cadastrar-servico-routing.module';

import { CadastrarServicoPage } from './cadastrar-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarServicoPageRoutingModule
  ],
  declarations: [CadastrarServicoPage]
})
export class CadastrarServicoPageModule {}
