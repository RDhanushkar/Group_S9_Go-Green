import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.page.html',
  styleUrls: ['./crop.page.scss'],
})
export class CropPage implements OnInit {


  constructor(private Router:ActivatedRoute,private homeService: HomeService) { }
  crop:Crop;
  cropSub:Subscription
  paramSub:Subscription
  ngOnInit() {


    this.paramSub=this.Router.paramMap.subscribe(paramMap=>{
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
      if(this.cropSub || this,this.paramSub)
      {
        this.cropSub.unsubscribe()
        this.paramSub.unsubscribe()
      }
  }
}
