import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalInterventionPage } from './animal-intervention.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalInterventionPage
  },
  {
    path: 'add-intervention',
    loadChildren: () => import('./add-intervention/add-intervention.module').then( m => m.AddInterventionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalInterventionPageRoutingModule {}
