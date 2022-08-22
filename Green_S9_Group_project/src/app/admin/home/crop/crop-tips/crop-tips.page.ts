import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	AnimationController,
	LoadingController,
	ModalController,
	SegmentChangeEventDetail
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
import { AddtipPage } from './addtip/addtip.page';

@Component({
	selector: 'app-crop-tips',
	templateUrl: './crop-tips.page.html',
	styleUrls: ['./crop-tips.page.scss']
})
export class CropTipsPage implements OnInit, OnDestroy {
	constructor(
		private animationCtrl: AnimationController,
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute
	) {}

	tipSub: Subscription;
	cropTips: CropTips[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;

	sowTips: CropTips[];
	csowTips: CropTips[];
	Tips_for_choosing = 'Tips_for_choosing';
	ngOnInit() {
		this.isLoading = true;

		this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});

			this.tipSub = this.homeService
				.fetchAlltips(this.crop.name)
				.subscribe(tips => {
					if (tips.message) {
						this.message = tips.message;
						this.isLoading = false;
					} else {
						this.cropTips = tips;
						this.isLoading = false;
					}
				});
		});
	}

	doRefresh(event) {
		setTimeout(() => {
			this.isLoading = true;

			this.isLoading = true;
			this.tipSub = this.homeService
				.fetchAlltips(this.crop.name)
				.subscribe(tips => {
					if (tips.message) {
						this.message = tips.message;
						this.isLoading = false;
					} else {
						this.cropTips = tips;
						this.isLoading = false;
					}
				});
			event.target.complete();
		}, 2000);
	}
	message: string;
	ionViewWillEnter() {
		this.isLoading = true;
		this.tipSub = this.homeService
			.fetchAlltips(this.crop.name)
			.subscribe(tips => {
				if (tips.message) {
					this.message = tips.message;
					this.isLoading = false;
				} else {
					this.cropTips = tips;
					this.isLoading = false;
				}
			});
	}

	// type = 'sowing';
	// segmentChanged(event:CustomEvent<SegmentChangeEventDetail>)
	// {
	//   if(event.detail.value === 'sowing')
	//   {
	//     this.type = 'sowing'
	//   }
	//   else{
	//     this.type = 'tips_for_choosing'
	//   }
	// }

	showPage() {}

	ngOnDestroy() {
		if (this.tipSub || this.cropSub) {
			this.tipSub.unsubscribe();
			this.cropSub.unsubscribe();
		}
	}
}
