import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowTipPageRoutingModule } from './show-tip-routing.module';

import { ShowTipPage } from './show-tip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowTipPageRoutingModule
  ],
  declarations: [ShowTipPage]
})
export class ShowTipPageModule {}
