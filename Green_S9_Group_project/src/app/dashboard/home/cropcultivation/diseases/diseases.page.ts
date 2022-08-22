import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { Disease } from 'src/app/models/disease.model';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.page.html',
  styleUrls: ['./diseases.page.scss'],
})
export class DiseasesPage implements OnInit, OnDestroy {

  constructor(private homeService: HomeService,private route: ActivatedRoute,private router: Router) { }

  tipSub:Subscription
  diseases:Disease[];
  crop:Crop;
  isLoading = false
  cropSub:Subscription

  ngOnInit() {
    this.isLoading = true

    this.route.paramMap.subscribe(paraMap=>{
      if(!paraMap.has('cropId'))
      {
        return
      }

      this.cropSub = this.homeService.getCrop(paraMap.get('cropId')).subscribe(crop=>{
        this.crop = crop
      })
    })
  }

  ionViewWillEnter()
  {
    this.isLoading = true
    this.tipSub = this.homeService.fetchAllDisease(this.crop.name).subscribe(diseases=>{
      this.diseases = diseases
      console.log(this.crop.name);


      this.isLoading = false
    })
  }

  about(id:string)
  {
    this.router.navigate(['/admin','tabs','home',this.crop.name,'diseases','about-disease',id]);
  }

  remedy(id:string)
  {
    this.router.navigate(['/admin','tabs','home',this.crop.name,'diseases','remedy-disease',id]);

  }


  ngOnDestroy()
  {
    if(this.tipSub)
    {
      this.tipSub.unsubscribe()
    }
  }


}
