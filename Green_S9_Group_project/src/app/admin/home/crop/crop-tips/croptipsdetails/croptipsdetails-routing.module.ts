import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CroptipsdetailsPage } from './croptipsdetails.page';

const routes: Routes = [
  {
    path: '',
    component: CroptipsdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CroptipsdetailsPageRoutingModule {}
