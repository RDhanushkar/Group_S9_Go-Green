import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizerCalculatorPage } from './fertilizer-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizerCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizerCalculatorPageRoutingModule {}
