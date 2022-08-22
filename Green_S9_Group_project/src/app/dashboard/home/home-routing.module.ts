import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'cropcultivation',
    children:[
      {
        path:'',
        loadChildren: () => import('./cropcultivation/cropcultivation.module').then( m => m.CropcultivationPageModule)
      },
      {
        path: 'fertilizer-calculator',
        loadChildren: () => import('./cropcultivation/fertilizer-calculator/fertilizer-calculator.module').then( m => m.FertilizerCalculatorPageModule)
      },
      {
        path: 'crop-tips',
        loadChildren: () => import('./cropcultivation/crop-tips/crop-tips.module').then( m => m.CropTipsPageModule)
      },
      {
        path: 'diseases',
        loadChildren: () => import('./cropcultivation/diseases/diseases.module').then( m => m.DiseasesPageModule)
      },
      {
        path: 'animal-intervention',
        loadChildren: () => import('./cropcultivation/animal-intervention/animal-intervention.module').then( m => m.AnimalInterventionPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
