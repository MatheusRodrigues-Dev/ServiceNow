import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoemailPageRoutingModule } from './codigoemail-routing.module';

import { CodigoemailPage } from './codigoemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoemailPageRoutingModule
  ],
  declarations: [CodigoemailPage]
})
export class CodigoemailPageModule {}
