import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService:AuthService,private route:Router) { }

  readonly url = "http://localhost:27017/users";
  
  zones = [
    'jaffna',
    'colombo',
    'abcd',
    'dasdad',
    'jyujyu',
    ';op;o',
  ]
  ngOnInit() {
  }

  submittedForm(form:NgForm)
  {
    if(!form.valid)
    {      
      console.log('not');
      
      return ;
    }

    console.log(form);
    
    this.authService.logup(
      form.value.username,
      form.value.yourname,
      form.value.mobile,
      form.value.nic,
      form.value.address,
      form.value.zone,
      form.value.password,
    ).subscribe(()=>{
      this.route.navigateByUrl('dashboard/tabs/home')
    });

  }

}
