import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiseasesPage } from './diseases.page';

const routes: Routes = [
  {
    path: '',
    component: DiseasesPage
  },
  {
    path: 'add-disease',
    loadChildren: () => import('./add-disease/add-disease.module').then( m => m.AddDiseasePageModule)
  },
  {
    path: 'remedy-disease',
    loadChildren: () => import('./remedy-disease/remedy-disease.module').then( m => m.RemedyDiseasePageModule)
  },
  {
    path: 'about-disease',
    loadChildren: () => import('./about-disease/about-disease.module').then( m => m.AboutDiseasePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseasesPageRoutingModule {}
