import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutDiseasePage } from './about-disease.page';

const routes: Routes = [
  {
    path: '',
    component: AboutDiseasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutDiseasePageRoutingModule {}
