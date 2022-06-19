import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalInterventionPage } from './animal-intervention.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalInterventionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalInterventionPageRoutingModule {}
