import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropPage } from './crop.page';

const routes: Routes = [
  {
    path: '',
    component: CropPage
  },
  {
    path: 'animal-intervention',
    loadChildren: () => import('./animal-intervention/animal-intervention.module').then( m => m.AnimalInterventionPageModule)
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
    path: 'add-disease',
    loadChildren: () => import('./diseases/add-disease/add-disease.module').then( m => m.AddDiseasePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropPageRoutingModule {}
