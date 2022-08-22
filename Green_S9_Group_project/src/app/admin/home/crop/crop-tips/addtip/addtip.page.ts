import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
  selector: 'app-addtip',
  templateUrl: './addtip.page.html',
  styleUrls: ['./addtip.page.scss'],
})
export class AddtipPage implements OnInit {

  constructor(
    private loadCtrl:LoadingController,
    private model:ModalController,
    private route:ActivatedRoute,
    private homeService: HomeService,
    private router: Router) { }

  isLoading = false
  crop:Crop;
  cropSub:Subscription
  paramSub:Subscription
  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('cropId'))
      {
        return
      }

      this.cropSub = this.homeService.getCrop(paramMap.get('cropId')).subscribe(crop=>{
        this.crop = crop

      })
    })

  }



  submittedForm(form:NgForm)
  {
    if(!form.valid)
    {
      return
    }
    else{
      this.loadCtrl.create({
        message:'Creating...',
        animated:true,
        backdropDismiss:false,
        duration:2000,
        spinner:'circles',
        cssClass: 'custom-loading'

      }).then(el=>{
        el.present()

          this.cropSub = this.homeService.addTips(this.crop.name,form.value.type,form.value.information).subscribe(()=>{
            el.dismiss()
            this.router.navigate(['/admin','tabs','home',this.crop.name,'crop-tips'])
          })
      })


    }


  }

  ngOnDestroy()
  {
    if(this.cropSub || this.paramSub)
    {
      this.cropSub.unsubscribe()
      this.paramSub.unsubscribe()
    }
  }
}
