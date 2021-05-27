import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  newpass:any;
  cpass:any;
  memberid:any;

  constructor(private apiService : ApiserviceService,private router : Router) { }

  ngOnInit() {
  }

  updatePassword(){
    this.newpass = document.getElementsByTagName('ion-input')[0].value;
    this.cpass = document.getElementsByTagName('ion-input')[1].value;
    if(this.newpass == this.cpass && (this.newpass != '')){
      console.log(this.newpass);
      const data = {
        "member_id":localStorage.getItem('memberid'),
        "member_password":this.newpass
      }
      const res = this.apiService.putData('updatepassword',JSON.stringify(data));
      res.subscribe(results => {
        alert("Password Updated SuccessFully !!");
       
        this.router.navigateByUrl('');
      },err => {
        alert("Cannot Update Password Currently");
      })
    }else{
      alert("Please Check !")
    }
  }

}
