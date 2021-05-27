import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  memberdetails:any;
  pass:any
  constructor(private route:Router,private apiService : ApiserviceService) { }

  ngOnInit() {
  }

  login() {
   if(document.getElementsByTagName('ion-input')[0].value == '' || document.getElementsByTagName('ion-input')[1].value == ''){
     alert("Please Fill All The Fields");
   }else{
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
        this.route.navigateByUrl('');
      }else{
        alert("Check Username or Password");
      }
      
    })
   }
    
    //this.route.navigateByUrl('')
  }

}
