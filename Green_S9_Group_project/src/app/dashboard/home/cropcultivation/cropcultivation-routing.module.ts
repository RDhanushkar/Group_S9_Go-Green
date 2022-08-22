import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropcultivationPage } from './cropcultivation.page';

const routes: Routes = [
  {
    path: '',
    component: CropcultivationPage
  },
  {
    path: 'fertilizer-calculator',
    loadChildren: () => import('./fertilizer-calculator/fertilizer-calculator.module').then( m => m.FertilizerCalculatorPageModule)
  },
  {
    path: 'crop-tips',
    loadChildren: () => import('./crop-tips/crop-tips.module').then( m => m.CropTipsPageModule)
  },
  {
    path: 'diseases',
    loadChildren: () => import('./diseases/diseases.module').then( m => m.DiseasesPageModule)
  },
  {
    path: 'animal-intervention',
    loadChildren: () => import('./animal-intervention/animal-intervention.module').then( m => m.AnimalInterventionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropcultivationPageRoutingModule {}
