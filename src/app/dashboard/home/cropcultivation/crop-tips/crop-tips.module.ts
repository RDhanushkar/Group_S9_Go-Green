import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropTipsPageRoutingModule } from './crop-tips-routing.module';

import { CropTipsPage } from './crop-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropTipsPageRoutingModule
  ],
  declarations: [CropTipsPage]
})
export class CropTipsPageModule {}
