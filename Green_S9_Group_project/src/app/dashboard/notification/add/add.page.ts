import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit,OnDestroy{

  constructor(private list:NotificationService,private router:Router) { }

  ngOnInit() {
  }


sub:Subscription;

  SubmittedForm(form: NgForm)
  {
    this.sub=this.list.createCustomer(
      form.value.firstname,
      form.value.lastname,
      form.value.email,
    ).subscribe(()=>{
      this.router.navigateByUrl('/dashboard/tabs/notification');
    });
  }

  ngOnDestroy(): void {
      if(this.sub)
      {
        this.sub.unsubscribe();
      }
  }
}
