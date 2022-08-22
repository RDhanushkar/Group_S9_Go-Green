import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInterventionPage } from './add-intervention.page';

const routes: Routes = [
  {
    path: '',
    component: AddInterventionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInterventionPageRoutingModule {}
