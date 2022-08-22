import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemedyDiseasePage } from './remedy-disease.page';

const routes: Routes = [
  {
    path: '',
    component: RemedyDiseasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemedyDiseasePageRoutingModule {}
