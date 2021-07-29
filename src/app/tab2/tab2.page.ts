import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  notices:any;
  loading:any;
  constructor(private apiService : ApiserviceService,public loadingController : LoadingController) {
    
  }
  ionViewWillEnter(){
    this.getNotices();
  }	
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Fetching All Notices...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }
 todayDate : Date = new Date();

 getNotices(){
   this.presentLoading();
   const res = this.apiService.getData('getnotice');
   res.subscribe(results => {
     console.log("orginial",results);
    this.notices = results.reverse();
    this.loading.dismiss();
    console.log("notices are",this.notices);
   })
 }
}
