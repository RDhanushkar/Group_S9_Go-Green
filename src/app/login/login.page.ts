import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private loadingCtrl:LoadingController) { }
  isLoading = false;
  islogin =true;
  ngOnInit() {
  }

  logMeIn(){
    //
   this.router.navigate(['/home']);
  }

  submittedForm(form:NgForm)
  {
    if(!form.valid)
    {
      return;
    }

   
      const email = form.value.email;
      const password = form.value.password;
      console.log(form.value);

      this.router.navigateByUrl('');
  }
}
