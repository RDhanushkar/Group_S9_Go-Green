import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {tap,take,map, switchMap, catchError} from 'rxjs/operators'
import { AuthService } from '../login/auth.service';
import * as CryptoJS from 'crypto-js';
//npm install crypto-js
@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAllProducts: any;
  _products: any;
  encrypyKey = 'greenproject'
  constructor(private http:HttpClient,private authentication:AuthService) { }
  readonly url = "http://localhost:8100/users";

  private _users = new BehaviorSubject([])

  getAllUser()
  {
    return this._users.asObservable();
  }


  encryptData(data) {

      try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), this.encrypyKey).toString();
      } catch (e) {
        console.log(e);
      }
    }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encrypyKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  logup(
    username:string,
    yourname:string,
    mobile:string,
    nic:string,
    address:string,
    zone:string,
    password:string
  ){

    let genId:string;

    const encPassword = this.encryptData(password)
    const encNic = this.encryptData(nic)
    const token = this.encryptData(Math.random().toString())
    const newuser = {
      userId:Math.random().toString(),
      username:username,
      yourname:yourname,
      mobile:mobile,
      nic:encNic,
      address:address,
      zone:zone,
      password:encPassword,
      role:'farmer',
      token:token,
      registered:true
    };

    // this.authentication.signup().subscribe()
    return  this.http.post<{name:string}>("https://greenproject-6f3b9-default-rtdb.firebaseio.com/users.json",{...newuser,userId:null})
  }

  login(username:string,password:string)
  {

  }
}

