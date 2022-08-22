import { AuthService } from 'src/app/login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from '../service/home.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	constructor(
		private homeService: HomeService,
		private authService: AuthService
	) {}

	crops: Crop[];

	cropsSub: Subscription;
	authSub: Subscription;

	ngOnInit() {
		this.cropsSub = this.homeService.AllCrops.subscribe(crops => {
			this.crops = crops;
		});

		this.authSub = this.authService.isAuthenticated.subscribe(data => {
			console.log(data);
		});
	}
}

//projectgreen151
//@greenproject151
