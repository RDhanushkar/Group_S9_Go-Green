import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutDiseasePageRoutingModule } from './about-disease-routing.module';

import { AboutDiseasePage } from './about-disease.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutDiseasePageRoutingModule
  ],
  declarations: [AboutDiseasePage]
})
export class AboutDiseasePageModule {}
