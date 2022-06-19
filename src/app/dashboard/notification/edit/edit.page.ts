/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(private list: NotificationService,private router: ActivatedRoute) { }
  reactiveform: FormGroup;
  isLoading = false;
  customer: any;
  copycustomer: any;
  ngOnInit() {
    this.isLoading = true;
    this.router.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('id'))
      {
        return ;
      }

      this.list.getACustomer(paramMap.get('id')).subscribe((customer: any[])=>{
        this.copycustomer = customer;
        this.customer = this.copycustomer.result;

        console.log(this.customer);

        this.reactiveform = new FormGroup({
          firstname:new FormControl(this.customer.firstname,{
            updateOn:'blur',
            validators:[Validators.required]
          }),

          lastname:new FormControl(this.customer.lastname,{
            updateOn:'blur',
            validators:[Validators.required]
          }),

          email: new FormControl(this.customer.email,{
            updateOn:'blur',
            validators:[Validators.required]
          }),

        })
        this.isLoading = false;
      });
    });
  }
}
