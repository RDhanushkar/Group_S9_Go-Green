import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';
import { CropTips } from '../models/croptips.models';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	constructor(private http: HttpClient) {}

	private _croptips = new BehaviorSubject([]);
	private _cropdiseases = new BehaviorSubject([]);

	private _crops = new BehaviorSubject<Crop[]>([
		{
			name: 'Onion',
			img: 'assets/project_images/onion.jfif'
		},
		{
			name: 'Carrot',
			img: 'assets/project_images/carrot.jfif'
		},
		{
			name: 'Ginger',
			img: 'assets/project_images/ginger.jfif'
		},
		{
			name: 'Pottato',
			img: 'assets/project_images/pottato.jfif'
		},
		{
			name: 'Turmeric',
			img: 'assets/project_images/turmeric.png'
		},
		{
			name: 'Paddy',
			img: 'assets/project_images/paddy.jpg'
		}
	]);

	get AllCrops() {
		return this._crops.asObservable();
	}

	get AllcropTips() {
		return this._croptips.asObservable();
	}

	get AllDiseases() {
		return this._cropdiseases.asObservable();
	}

	fetchAlltips(name: string) {
		return this.http
			.get<any>('http://localhost:5000/api/crop/getTips/' + name)
			.pipe(
				take(1),
				map(data => {
					if (data.message) {
						console.log(data.message);
						return data;
					} else {
						const tips = [];
						for (var tip of data.cropTips) {
							console.log(tip);

							tips.push({
								tipsId: tip.id,
								name: tip.name,
								type: tip.type,
								information: tip.information
							});
						}

						return tips;
					}
				}),
				tap(data => {
					this._croptips.next(data);
				})
			);
	}

	fetchAllDisease(name: string) {
		return this.http
			.get<any>('http://localhost:5000/api/crop/getDiseases/' + name)
			.pipe(
				take(1),
				map(data => {
					if (data.message) {
						console.log(data.message);
						return data;
					} else {
						const tips = [];
						console.log(data);

						for (var disease of data.cropDiseases) {
							tips.push({
								diseaseId: disease.id,
								diseaseName: disease.diseaseName,
								aboutDisease: disease.aboutDisease,
								cropName: disease.cropName,
								remedyAction: disease.remedyAction,
								image: disease.image
							});
						}

						return tips;
					}
				}),
				tap(data => {
					this._cropdiseases.next(data);
				})
			);
	}

	addTips(name: string, type: string, information: string) {
		let genId: string;
		const newCropTip = {
			cropName: name,
			type: type,
			information: information
		};
		return this.http
			.post<any>('http://localhost:5000/api/crop/createTip', newCropTip)
			.pipe(
				take(1),
				switchMap(data => {
					return this.AllcropTips;
				}),
				tap(tips => {
					this._croptips.next(tips);
				})
			);
	}

	addDisease(
		diseaseName: string,
		aboutDisease: string,
		cropName: string,
		remedyAction: string,
		image: File
	) {
    const formData = new FormData()
    formData.append('image',image)
    console.log(formData);
    console.log(image);

		const newCropTip = {
			diseaseName: diseaseName,
			about: aboutDisease,
			cropName: cropName,
			remedyAction: remedyAction,
			image:image
		};
		return this.http
			.post<any>('http://localhost:5000/api/crop/createDisease', newCropTip)
			.pipe(
				take(1),
				switchMap(data => {
					return this.AllcropTips;
				}),
				tap(tips => {
					this._croptips.next(tips);
				})
			);
	}

	getTip(tipId: string) {
		return this.http
			.get<any>('http://localhost:5000/api/crop/cropTips/' + tipId)
			.pipe(
				take(1),
				map(data => {
					return {
						tipsId: data.tip.id,
						name: data.tip.name,
						type: data.tip.type,
						information: data.tip.information
					};
				})
			);
	}

	getDisease(id: string) {
		return this.http
			.get<any>('http://localhost:5000/api/crop/cropDisease/' + id)
			.pipe(
				take(1),
				map(data => {
					return {
						diseaseId: data.id,
						diseaseName: data.diseaseName,
						aboutDisease: data.aboutDisease,
						cropName: data.cropName,
						remedyAction: data.remedyAction,
						image: data.image
					};
				})
			);
	}

	updateTip(id: string, name: string, type: string, information: string) {
		let updatedtips: CropTips[];
		return this.AllcropTips.pipe(
			take(1),
			switchMap(tips => {
				if (!tips || tips.length <= 0) {
					return this.fetchAlltips(name);
				} else {
					return of(tips);
				}
			}),
			switchMap(tips => {
				const index = tips.findIndex(p => p.tipsId === id);
				const oldtip = tips[index];

				updatedtips = [...tips];

				updatedtips[index] = {
					tipsId: id,
					name: name,
					type: type,
					information: information
				};

				return this.http.put(
					`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`,
					{ ...updatedtips[index], tipsId: null }
				);
			}),
			tap(() => {
				this._croptips.next(updatedtips);
			})
		);
	}

	// updateDisease(
	//   id:string,
	//   name:string,
	//   title:string,
	//   information:string
	// )
	// {

	//   let updatedtips:Disease[];
	//   return this.AllDiseases.pipe(
	//     take(1),
	//     switchMap(disease=>{
	//       if(!disease || disease.length <=0)
	//       {
	//         return this.fetchAllDisease(name);
	//       }
	//       else
	//       {
	//         return of(disease)
	//       }
	//     }),
	//     switchMap(disease=>{
	//       const index = disease.findIndex(p=>p.tipsId === id)
	//       const oldtip = disease[index]

	//       updatedtips = [...disease]

	//       updatedtips[index] = {
	//         diseaseId:id,
	//         name:name,
	//         title:title,
	//         information:information
	//       }

	//       return this.http.put(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease/${id}.json`,{...updatedtips[index],diseaseId:null})
	//     }),
	//     tap(()=>{
	//       this._cropdiseases.next(updatedtips)
	//     })
	//   )
	// }

	CancelTip(id: string) {
		return this.http
			.delete(
				`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`
			)
			.pipe(
				take(1),
				switchMap(() => {
					return this.AllcropTips;
				}),
				tap(tips => {
					this._croptips.next(tips.filter(p => p.cropId !== id));
				})
			);
	}

	CancelDisease(id: string) {
		return this.http
			.delete(
				`https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease/${id}.json`
			)
			.pipe(
				take(1),
				switchMap(() => {
					return this.AllDiseases;
				}),
				tap(tips => {
					this._cropdiseases.next(tips.filter(p => p.diseaseId !== id));
				})
			);
	}

	private _showingTips = new BehaviorSubject([
		'Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.',
		'Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.',
		'Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.',
		'Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.',
		'Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.'
	]);

	get Allcrops() {
		return this._crops.asObservable();
	}

	get AllSawTips() {
		return this._showingTips.asObservable();
	}

	addCrop(name: string, img: string) {
		let genId: string;

		const newCrop = {
			cropId: Math.random().toString(),
			name: name,
			img: img
		};

		return this.Allcrops.pipe(
			take(1),
			tap(crops => {
				this._crops.next(crops.concat(newCrop));
			})
		);
	}

	getCrop(cropId: string) {
		return this.Allcrops.pipe(
			take(1),
			map(crops => {
				return { ...crops.find(p => p.name === cropId) };
			})
		);
	}

	updateCrop(id: string, name: string, img: string) {
		return this.Allcrops.pipe(
			take(1),
			tap(crops => {
				const updatedCropIndex = crops.findIndex(pl => pl.name === name);
				const updatedCrops = [...crops];
				const oldCrop = updatedCrops[updatedCropIndex];
				updatedCrops[updatedCropIndex] = {
					name: name,
					img: oldCrop.img
				};
				this._crops.next(updatedCrops);
			})
		);
	}
}
