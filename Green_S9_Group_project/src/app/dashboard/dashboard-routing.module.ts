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
            children:[
              {
                path:'',
                loadChildren: () => import('./home/cropcultivation/cropcultivation.module').then( m => m.CropcultivationPageModule)
              },
              {
                path:'crop-tips',
                loadChildren: () => import('./home/cropcultivation/crop-tips/crop-tips.module').then( m => m.CropTipsPageModule)
              },
              {
                path:'diseases',
                children:[
                  {
                    path:'',
                    loadChildren: () => import('./home/cropcultivation/diseases/diseases.module').then( m => m.DiseasesPageModule)
                  },
                  // {
                  //   path:'about-disease/:diseaseId',
                  //   loadChildren: () => import('./home/crop/diseases/about-disease/about-disease.module').then( m => m.AboutDiseasePageModule)
                  // },
                  // {
                  //   path:'remedy-disease/:diseaseId',
                  //   loadChildren: () => import('./home/crop/diseases/remedy-disease/remedy-disease.module').then( m => m.RemedyDiseasePageModule)
                  // }
                ],
              },
              {
                path:'animal-intervention',
                loadChildren: () => import('./home/cropcultivation/animal-intervention/animal-intervention.module').then( m => m.AnimalInterventionPageModule)
              },
              // {
              //   path:"add-tips",
              //   loadChildren: () => import('./home/crop/crop-tips/addtip/addtip.module').then( m => m.AddtipPageModule)
              // },
              // {
              //   path:"add-disease",
              //   loadChildren: () => import('./home/crop/diseases/add-disease/add-disease.module').then( m => m.AddDiseasePageModule)
              // }


            ]
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
        path: 'reset-password',
        loadChildren: () => import('./profile/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
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
