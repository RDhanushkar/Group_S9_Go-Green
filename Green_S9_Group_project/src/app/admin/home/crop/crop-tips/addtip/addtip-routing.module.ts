import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtipPage } from './addtip.page';

const routes: Routes = [
  {
    path: '',
    component: AddtipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtipPageRoutingModule {}
