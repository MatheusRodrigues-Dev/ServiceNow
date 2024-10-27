import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestadorPageRoutingModule } from './prestador-routing.module';

import { PrestadorPage } from './prestador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestadorPageRoutingModule
  ],
  declarations: [PrestadorPage]
})
export class PrestadorPageModule {}
