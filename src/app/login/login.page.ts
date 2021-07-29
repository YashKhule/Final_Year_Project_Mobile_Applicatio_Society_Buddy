import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  memberdetails:any;
  pass:any
  loading:any
  constructor(private route:Router,private apiService : ApiserviceService,private alertController : AlertController,public loadingController : LoadingController) { }

  ngOnInit() {
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Please wait...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  login() {
   if(document.getElementsByTagName('ion-input')[0].value == '' || document.getElementsByTagName('ion-input')[1].value == ''){
    this.presentAlert("Please Fill All The Fields");
   }else{
    this.presentLoading();
     this.pass = document.getElementsByTagName('ion-input')[1].value;
    const data = {
      "member_mobile" : document.getElementsByTagName('ion-input')[0].value
    };
    console.log(JSON.stringify(data));
    const res = this.apiService.postData('memberlogin',JSON.stringify(data));
    res.subscribe(results => {
      console.log(results);
      this.memberdetails = results;
      console.log(this.memberdetails[0]['member_id']);
      if(this.pass == this.memberdetails[0]['member_password']){
        localStorage.setItem('memberid',this.memberdetails[0]['member_id']);
        localStorage.setItem('unitnumber',this.memberdetails[0]['member_unit_number']);
        localStorage.setItem('membername',this.memberdetails[0]['member_name']);
        localStorage.setItem('membermobile',this.memberdetails[0]['member_mobile']);
        this.loading.dismiss();
        this.route.navigateByUrl('');
      }else{
        this.loading.dismiss();
        this.presentAlert("Check Username or Password");
      }
      
    })
   }
    
    //this.route.navigateByUrl('')
  }

}
