import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import {  UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private userService:UserService,private route:Router,private authService:AuthService) { }


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

    this.authService.signup(
      form.value.username,
      form.value.yourname,
      form.value.mobile,
      form.value.nic,
      form.value.address,
      form.value.zone,
      form.value.password,
    ).subscribe(()=>{

      this.route.navigateByUrl('/dashboard/tabs/home')
    });

  }






}
