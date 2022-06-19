import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizerCalculatorPageRoutingModule } from './fertilizer-calculator-routing.module';

import { FertilizerCalculatorPage } from './fertilizer-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizerCalculatorPageRoutingModule
  ],
  declarations: [FertilizerCalculatorPage]
})
export class FertilizerCalculatorPageModule {}
