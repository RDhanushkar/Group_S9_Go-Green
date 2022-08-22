/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from './HomeServices/home.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  weatherTemp: any;
  todayDate = new Date();
  cityName: any;
  weatherIcon: any;
  weatherDetails: any;
  //extra add
  windSpeed: any;

  constructor(private homeService: HomeService, public httpClient: HttpClient) { 
    this.loadData();
  }

  loadData(){
    this.httpClient.get(`${API_URL}/weather?q=${'jaffna'},{'ISO 3166-1'}&appid=${API_KEY}`).subscribe(results =>{
      console.log(results);
      this.weatherTemp = results ['main'];
      this.cityName = results['name'];
      console.log(this.weatherTemp);
      this.weatherIcon = results ['weather'][0];
      console.log(this.weatherDetails);
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherIcon.icon}@4x.png`; //not weatherDeatail
      this.windSpeed = results["wind"];
    });
  }

  crops: Crop[];

  cropsSub: Subscription;

  ngOnInit() {

    this.cropsSub = this.homeService.Allcrops.subscribe(crops=>{
      this.crops = crops;
    });


  }

}
