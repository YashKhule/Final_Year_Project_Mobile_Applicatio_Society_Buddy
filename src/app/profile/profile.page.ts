import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  memberid:any;
  profiledetails:any;
  loading:any;
  constructor(private apiService : ApiserviceService,private router : Router,public loadingController : LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getProfileDetails();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Fetching Details...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }

  getProfileDetails(){
    this.presentLoading();
    const data = {
      "member_mobile" : localStorage.getItem('membermobile')
    }
    const res = this.apiService.postData('memberlogin',JSON.stringify(data));
    res.subscribe(results => {
      console.log(results);
      this.profiledetails = results[0];
      this.loading.dismiss();
    })
  }

  forgetPassword(){
    this.router.navigateByUrl('resetpassword');
    console.log("forget password");
  }

}
