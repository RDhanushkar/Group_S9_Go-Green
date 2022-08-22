import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from '../../HomeServices/home.service';

@Component({
  selector: 'app-crop-tips',
  templateUrl: './crop-tips.page.html',
  styleUrls: ['./crop-tips.page.scss'],
})
export class CropTipsPage implements OnInit {

  constructor(private homeService: HomeService,private route: ActivatedRoute) { }

  crop:Crop;
  saws = [];
  cropSub:Subscription
  cropTips:CropTips[];
  isLoading  = false
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('cropId'))
      {
        return
      }

      this.cropSub = this.homeService.getCrop(paramMap.get('cropId')).subscribe(crop=>{
        this.crop = crop
      })
    })

    this.cropSub = this.homeService.AllSawTips.subscribe(saws=>{
      this.saws = saws
    })

  }

  ionViewWillEnter()
  {
    this.isLoading = true
    this.cropSub = this.homeService.fetchAlltips(this.crop.name).subscribe(tips=>{
      this.cropTips = tips
      this.isLoading = false
    })
  }

}
