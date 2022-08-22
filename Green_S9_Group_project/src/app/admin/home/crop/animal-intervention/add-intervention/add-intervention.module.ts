import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInterventionPageRoutingModule } from './add-intervention-routing.module';

import { AddInterventionPage } from './add-intervention.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInterventionPageRoutingModule
  ],
  declarations: [AddInterventionPage]
})
export class AddInterventionPageModule {}
