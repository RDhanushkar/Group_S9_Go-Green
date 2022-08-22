import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalInterventionPageRoutingModule } from './animal-intervention-routing.module';

import { AnimalInterventionPage } from './animal-intervention.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalInterventionPageRoutingModule
  ],
  declarations: [AnimalInterventionPage]
})
export class AnimalInterventionPageModule {}
