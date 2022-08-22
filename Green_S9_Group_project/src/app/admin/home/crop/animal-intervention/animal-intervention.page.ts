import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
  selector: 'app-animal-intervention',
  templateUrl: './animal-intervention.page.html',
  styleUrls: ['./animal-intervention.page.scss'],
})
export class AnimalInterventionPage implements OnInit {

  constructor(private animationCtrl: AnimationController,
    private loadCtrl:LoadingController,
    private modelCtrl: ModalController,private homeService:HomeService,private route:ActivatedRoute) { }

  tipSub:Subscription
  cropTips:CropTips[];
  crop:Crop;
  isLoading = false
  cropSub:Subscription
  paramSub:Subscription

  ngOnInit() {
    this.isLoading = true
    this.paramSub = this.route.paramMap.subscribe(paraMap=>{
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
    this.tipSub = this.homeService.fetchAlltips(this.crop.name).subscribe(tips=>{
      this.cropTips = tips
      this.isLoading = false
    })
  }

  addCropTips()
  {

  }








  ngOnDestroy()
  {
    if(this.tipSub || this.paramSub)
    {
      this.tipSub.unsubscribe()
      this.paramSub.unsubscribe()
    }
  }

}
