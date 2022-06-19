import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(private list:NotificationService,private router:ActivatedRoute) { }

  isLoading = false;
  customer:any;
  copycustomer:any;
  ngOnInit() {
    this.isLoading = true;
    this.router.paramMap.subscribe(paramMap=>{
      if(!paramMap)
      {
        return ;
      }

      this.list.getACustomer(paramMap.get('id')).subscribe((customer:any[])=>{
        this.copycustomer = customer;
        this.customer = this.copycustomer.result;

        this.isLoading = false;
      });
    });
  }

}
