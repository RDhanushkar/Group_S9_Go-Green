import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropcultivationPageRoutingModule } from './cropcultivation-routing.module';

import { CropcultivationPage } from './cropcultivation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropcultivationPageRoutingModule
  ],
  declarations: [CropcultivationPage]
})
export class CropcultivationPageModule {}
