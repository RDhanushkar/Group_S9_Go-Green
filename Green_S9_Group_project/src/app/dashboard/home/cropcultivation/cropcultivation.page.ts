import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/dashboard/home/HomeServices/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
  selector: 'app-cropcultivation',
  templateUrl: './cropcultivation.page.html',
  styleUrls: ['./cropcultivation.page.scss'],
})
export class CropcultivationPage implements OnInit,OnDestroy {

  constructor(private Router:ActivatedRoute,private homeService: HomeService) { }
  crop:Crop;
  cropSub:Subscription
  ngOnInit() {


    this.Router.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('cropId'))
      {
        return;
      }

     this.cropSub = this.homeService.getCrop(paramMap.get('cropId')).subscribe(crop=>{
        this.crop = crop

     })

    });
  }

  ngOnDestroy(): void {
      if(this.cropSub)
      {
        this.cropSub.unsubscribe()
      }
  }

}
