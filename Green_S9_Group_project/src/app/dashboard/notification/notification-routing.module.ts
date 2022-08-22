import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
