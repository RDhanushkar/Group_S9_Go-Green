import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

import { environment } from 'src/environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  getAllCustomers()
  {
    const url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.GET_ALL_CUSTOMERS;
    return this.http.get(url);
  }

  getACustomer(id: string)
  {
    const url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.GET_CUSTOMER+id;
    return this.http.get(url);
  }

  cancelCustomer(id: string)
  {
    const url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.DELETE_CUSTOMER+id;
    return this.http.get(url);
  }

  createCustomer(
    firstname: string,
    lastname: string,
    email: string,
  )
  {
    const newcustomer={
      firstname,
      lastname,
      email,
      password:'123456789'
    };

    const url = environment.CUSTOMER_BASE_URL+environment.CUSTOMER.CREATE_CUSTOMER;
    return this.http.post(url,newcustomer);

  }
}
