import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  loading:any;
  constructor(private apiService : ApiserviceService,private router : Router,public loadingController : LoadingController) { }

  ngOnInit() {
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Resetting Password...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }

  updatePassword(){
    this.newpass = document.getElementsByTagName('ion-input')[0].value;
    this.cpass = document.getElementsByTagName('ion-input')[1].value;
    if(this.newpass == this.cpass && (this.newpass != '')){
      this.presentLoading();
      console.log(this.newpass);
      const data = {
        "member_id":localStorage.getItem('memberid'),
        "member_password":this.newpass
      }
      const res = this.apiService.putData('updatepassword',JSON.stringify(data));
      res.subscribe(results => {
        this.loading.dismiss();
        alert("Password Updated SuccessFully !!");
       
        this.router.navigateByUrl('');
      },err => {
        this.loading.dismiss();
        alert("Cannot Update Password Currently");
      })
    }else{
      alert("Please Check !")
    }
  }

}
