import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CroptipsdetailsPageRoutingModule } from './croptipsdetails-routing.module';

import { CroptipsdetailsPage } from './croptipsdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CroptipsdetailsPageRoutingModule
  ],
  declarations: [CroptipsdetailsPage]
})
export class CroptipsdetailsPageModule {}
