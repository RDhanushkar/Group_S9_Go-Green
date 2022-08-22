import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  private _croptips = new BehaviorSubject([]);
  private _cropdiseases = new BehaviorSubject([]);

  private _crops = new BehaviorSubject<Crop[]>(
    [
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
  )




  get AllCrops()
  {
    return this._crops.asObservable()
  }

  get AllcropTips()
  {
    return this._croptips.asObservable();
  }

  get AllDiseases()
  {
    return this._cropdiseases.asObservable()
  }

  fetchAlltips(name:string)
  {
    return this.http.get<{[key:string]:CropTips}>(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips.json?orderBy="name"&equalTo="${name}"`).pipe(
      take(1),
      map(data=>{
        const tips = [];
        for(const key in data)
        {
          if(data.hasOwnProperty(key))
          {
            tips.push({
              tipsId:key,
              name:name,
              type:data[key].type,
              information:data[key].information
            })
          }
        }

        return tips
      }),
      tap(data=>{
        this._croptips.next(data)
      })
    )
  }


  fetchAllDisease(name:string)
  {
    return this.http.get<{[key:string]:Disease}>(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease.json?orderBy="cropName"&equalTo="${name}"`).pipe(
    take(1),
    map(data=>{
        const tips = [];
        for(const key in data)
        {
          if(data.hasOwnProperty(key))
          {
            tips.push({
              diseaseId:key,
              diseaseName:data[key].diseaseName,
              aboutDisease:data[key].aboutDisease,
              cropName:data[key].cropName,
              remedyAction:data[key].remedyAction,
              image:data[key].image
            })
          }
        }

        return tips
      }),
      tap(data=>{
        this._cropdiseases.next(data)
      })
    )
  }

  addTips(
    name:string,
    type:string,
    information:string
  )
  {

    let genId:string;
    const newCropTip = {
      tipsId:Math.random().toString(),
      name:name,
      type:type,
      information:information
    }
    return this.http.post<{name:string}>("https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips.json",{...newCropTip,tipsId:null}).pipe(
      take(1),
      switchMap(data=>{
        genId = data.name
        return this.AllcropTips
      }),
      tap(tips=>{
        newCropTip.tipsId = genId
        this._croptips.next(tips)
      })
    )
  }

  addDisease(
    diseaseName:string,
    aboutDisease:string,
    cropName:string,
    remedyAction:string,
    image:string
  )
  {

    let genId:string;
    const newCropTip = {
      diseaseId:Math.random().toString(),
      diseaseName:diseaseName,
      aboutDisease:aboutDisease,
      cropName:cropName,
      remedyAction:remedyAction,
      image:image
    }
    return this.http.post<{name:string}>("https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease.json",{...newCropTip,diseaseId:null}).pipe(
      take(1),
      switchMap(data=>{
        genId = data.name

        return this.AllcropTips
      }),
      tap(tips=>{
        newCropTip.diseaseId = genId
        this._croptips.next(tips)
      })
    )
  }

  getTip(cropTipId:string)
  {
    return this.http.get<CropTips>(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${cropTipId}.json`).pipe(
      take(1),
      map(data=>{
        return{
          cropTipId:cropTipId,
          name:data.name,
          type:data.type,
          information:data.information
        }
      })
    )
  }

  getDisease(id:string)
  {
    return this.http.get<Disease>(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease/${id}.json`).pipe(
      take(1),
      map(data=>{
        return{
          diseaseId:id,
          diseaseName:data.diseaseName,
          aboutDisease:data.aboutDisease,
          cropName:data.cropName,
          remedyAction:data.remedyAction,
          image:data.image
        }
      })
    )
  }

  updateTip(
    id:string,
    name:string,
    type:string,
    information:string
  )
  {

    let updatedtips:CropTips[];
    return this.AllcropTips.pipe(
      take(1),
      switchMap(tips=>{
        if(!tips || tips.length <=0)
        {
          return this.fetchAlltips(name);
        }
        else
        {
          return of(tips)
        }
      }),
      switchMap(tips=>{
        const index = tips.findIndex(p=>p.tipsId === id)
        const oldtip = tips[index]

        updatedtips = [...tips]

        updatedtips[index] = {
          tipsId:id,
          name:name,
          type:type,
          information:information
        }

        return this.http.put(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`,{...updatedtips[index],tipsId:null})
      }),
      tap(()=>{
        this._croptips.next(updatedtips)
      })
    )
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

  CancelTip(id:string)
  {
    return this.http.delete(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`).pipe(
      take(1),
      switchMap(()=>{
        return this.AllcropTips;
      }),
      tap(tips=>{
        this._croptips.next( tips.filter( p =>p.cropId !==id));
      })
    )
  }


  CancelDisease(id:string)
  {
    return this.http.delete(`https://greenproject-6f3b9-default-rtdb.firebaseio.com/cropdisease/${id}.json`).pipe(
      take(1),
      switchMap(()=>{
        return this.AllDiseases;
      }),
      tap(tips=>{
        this._cropdiseases.next( tips.filter( p =>p.diseaseId !==id));
      })
    )
  }



  private _showingTips = new BehaviorSubject([
    "Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.",
    "Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.",
    "Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.",
    "Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.",
    "Carrots (Daucus carota) like a sun and light, well-drained soil. If your soil is stony,shallow or heavy clay, you may end up with stunted or forked carrots, so try short-rooted types or grow them in raised beds or containers. Carrots are drought resistant, so rarely need watering.",

  ])


  get Allcrops()
  {
    return this._crops.asObservable();
  }

  get AllSawTips()
  {
    return this._showingTips.asObservable()
  }


  addCrop(
    name:string,
    img:string,
  )
  {

    let genId:string;

    const newCrop = {
      cropId:Math.random().toString(),
      name:name,
      img:img,
    }

    return this.Allcrops.pipe(
      take(1),
      tap(crops=>{
        this._crops.next(crops.concat(newCrop))
      })
    )

  }

  getCrop(cropId:string)
  {
    return this.Allcrops.pipe(
      take(1),
      map(crops=>{
        return {...crops.find(p=>p.name === cropId)}
      })
    )
  }



  updateCrop(id: string, name: string, img: string) {
    return this.Allcrops.pipe(
      take(1),
      tap(crops => {
        const updatedCropIndex = crops.findIndex(pl => pl.name === name);
        const updatedCrops = [...crops];
        const oldCrop = updatedCrops[updatedCropIndex];
        updatedCrops[updatedCropIndex] = {
          name:name,
          img:oldCrop.img
        };
        this._crops.next(updatedCrops);
      })
    );
  }




}
