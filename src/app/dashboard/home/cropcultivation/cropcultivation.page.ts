import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cropcultivation',
  templateUrl: './cropcultivation.page.html',
  styleUrls: ['./cropcultivation.page.scss'],
})
export class CropcultivationPage implements OnInit {

  constructor(private Router:ActivatedRoute) { }
  crops = [
    {
      'name':'Onion',
      'img':'assets/project_images/onion.jfif'
    },
    {
      'name':'Carrot',
      'img':'assets/project_images/carrot.jfif'
    },
    {
      'name':'Ginger',
      'img':'assets/project_images/ginger.jfif'
    }
    ,
    {
      'name':'Pottato',
      'img':'assets/project_images/pottato.jfif'
    },
    {
      'name':'Turmeric',
      'img':'assets/project_images/turmeric.png'
    },
    {
      'name':'Paddy',
      'img':'assets/project_images/paddy.jpg'
    }
  ]
  crop = {}
  ngOnInit() {

    this.Router.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('cropId'))
      {
        return;
      }

      this.crop = this.crops.find(crop => crop.name === paramMap.get('cropId'));
    });
  }

}
