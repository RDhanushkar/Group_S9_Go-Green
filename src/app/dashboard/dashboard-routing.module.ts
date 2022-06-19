import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardPage,
    children:[
      {
        path:'home',
        children:[
          {
            path:'',
            loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
          },
          {
            path:':cropId',
            loadChildren: () => import('./home/cropcultivation/cropcultivation.module').then( m => m.CropcultivationPageModule)
          }
        ]
      },
      {
        path: 'notification',
        children:[
          {
            path:'',
            loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
          },
          {
            path:'add',
            loadChildren: () => import('./notification/add/add.module').then( m => m.AddPageModule)
          },
          {
            path:'view/:id',
            loadChildren:()=> import('./notification/view/view.module').then(m=>m.ViewPageModule)
          },
          {
            path:'edit/:id',
            loadChildren:()=> import('./notification/edit/edit.module').then(m=>m.EditPageModule)
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/tabs/home',
        pathMatch: 'full'
       }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
