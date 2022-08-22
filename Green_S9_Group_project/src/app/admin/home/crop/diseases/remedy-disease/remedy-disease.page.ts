import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';

@Component({
  selector: 'app-remedy-disease',
  templateUrl: './remedy-disease.page.html',
  styleUrls: ['./remedy-disease.page.scss'],
})
export class RemedyDiseasePage implements OnInit,OnDestroy {

  constructor(
    private route:ActivatedRoute,
      private homeService: HomeService
    ) { }
    cropSub: Subscription;
    cisLoading = false;
    disLoading = false;
    crop: Crop;
    diseaseSub: Subscription
    paramSub: Subscription
    disease: Disease;

    ngOnInit() {

      this.paramSub = this.route.paramMap.subscribe(paramMap=>{
        this.cisLoading = true
        this.disLoading = true

        if(!paramMap.has('cropId') && !paramMap.has('diseaseId'))
        {
          return;
        }

        this.cropSub = this.homeService.getCrop(paramMap.get('cropId')).subscribe(crop=>{
          this.crop = crop;
          this.cisLoading = false

        });

        this.diseaseSub = this.homeService.getDisease(paramMap.get('diseaseId')).subscribe(disease=>{
          this.disease = disease;
          this.disLoading = false
        })
      });
    }

    ngOnDestroy(): void {

      if(this.cropSub || this.diseaseSub || this.paramSub)
      {
        this.cropSub.unsubscribe()
        this.diseaseSub.unsubscribe()
        this.paramSub.unsubscribe()
      }
    }
}
