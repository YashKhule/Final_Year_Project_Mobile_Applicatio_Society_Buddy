import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  memberid:any;
  profiledetails:any;

  constructor(private apiService : ApiserviceService,private router : Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getProfileDetails();
  }

  getProfileDetails(){
    const data = {
      "member_mobile" : localStorage.getItem('membermobile')
    }
    const res = this.apiService.postData('memberlogin',JSON.stringify(data));
    res.subscribe(results => {
      console.log(results);
      this.profiledetails = results[0];
    })
  }

  forgetPassword(){
    this.router.navigateByUrl('resetpassword');
    console.log("forget password");
  }

}
