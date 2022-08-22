import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDiseasePage } from './add-disease.page';

const routes: Routes = [
  {
    path: '',
    component: AddDiseasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDiseasePageRoutingModule {}
