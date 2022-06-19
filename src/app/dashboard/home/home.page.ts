import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

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
  ngOnInit() {
  }

}
