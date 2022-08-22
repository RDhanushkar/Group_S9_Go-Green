import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';

@Component({
	selector: 'app-add-disease',
	templateUrl: './add-disease.page.html',
	styleUrls: ['./add-disease.page.scss']
})
export class AddDiseasePage implements OnInit, OnDestroy {
	tipSub: Subscription;
	paramSub: Subscription;
	diseases: Disease[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;

	constructor(
		private loadCtrl: LoadingController,
		private homeService: HomeService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.paramSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('cropId')) {
				return;
			}
			this.isLoading = true;
			this.cropSub = this.homeService
				.getCrop(paramMap.get('cropId'))
				.subscribe(crop => {
					this.isLoading = false;
					this.crop = crop;
				});
		});
	}

	selectiveFile: File = null;

	uploadedFiles: Array<File>;
	uploadfile(event) {
		// console.log(this.selectiveFile =<File> event.target.files[0]);

		this.selectiveFile = event.target.files[0];
		console.log(this.selectiveFile);

		// lastModified: 1642140488289
		// lastModifiedDate: Fri Jan 14 2022 11:38:08 GMT+0530 (India Standard Time) {}
		// name: "vlcsnap-2022-01-14-11h38m08s289.png"
		// size: 553764
		// type: "image/png"
		// webkitRelativePath: ""
	}

	async SubmittedForm(form: NgForm) {
		if (!form.valid) {
			return;
		} else {
			const formdata = new FormData();

			if (form.value.image !== '') {
				// formdata.append('about', form.value.adisease);
				// formdata.append('cropName', this.crop.name);
				// formdata.append('remedyAction', form.value.raction);
				// formdata.append('diseaseName', form.value.disease);
				formdata.append('image', form.value.image);

				this.cropSub = this.homeService
					.addDisease(
						form.value.disease,
						form.value.adisease,
						this.crop.name,
						form.value.raction,
						this.selectiveFile
					)
					.subscribe(() => {
						// e.dismiss()
						this.router.navigate([
							'/admin',
							'tabs',
							'home',
							this.crop.name,
							'diseases'
						]);
					});
			}
      // else {
			// 	this.cropSub = this.homeService
			// 		.addDisease(
			// 			form.value.disease,
			// 			form.value.adisease,
			// 			this.crop.name,
			// 			form.value.raction,
			// 		  ''
			// 		)
			// 		.subscribe(() => {
			// 			// e.dismiss()
			// 			this.router.navigate([
			// 				'/admin',
			// 				'tabs',
			// 				'home',
			// 				this.crop.name,
			// 				'diseases'
			// 			]);
			// 		});
			// }

			// './assets/images/{}/event.target.files[0]

			// this.loadCtrl.create({
			//   message:"Creating...",
			//   duration:1000,
			//   spinner:'bubbles',
			// }).then(e=>{
			//   e.present()

			// })
		}
	}

	ngOnDestroy(): void {
		if (this.cropSub || this.paramSub) {
			this.cropSub.unsubscribe();
			this.paramSub.unsubscribe();
		}
	}
}
