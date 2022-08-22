import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemedyDiseasePageRoutingModule } from './remedy-disease-routing.module';

import { RemedyDiseasePage } from './remedy-disease.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemedyDiseasePageRoutingModule
  ],
  declarations: [RemedyDiseasePage]
})
export class RemedyDiseasePageModule {}
