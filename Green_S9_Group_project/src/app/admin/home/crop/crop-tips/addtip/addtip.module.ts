import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtipPageRoutingModule } from './addtip-routing.module';

import { AddtipPage } from './addtip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtipPageRoutingModule
  ],
  declarations: [AddtipPage]
})
export class AddtipPageModule {}
