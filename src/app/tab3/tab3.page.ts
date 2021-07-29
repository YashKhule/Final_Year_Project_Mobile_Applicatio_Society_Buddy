import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  memberid:any;
  reminders:any;
  loading:any;
  constructor(private apiService : ApiserviceService,public loadingController : LoadingController) {
    
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Fetching All Reminders...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }
  ionViewWillEnter(){
    this.getReminders();
  }	

  getReminders(){
    this.presentLoading();
    this.memberid = localStorage.getItem('memberid');
    const res = this.apiService.getData('getreminders/'+this.memberid);
    res.subscribe(results => {
      console.log(results);
      this.reminders = results.reverse();
      this.loading.dismiss();
    })
  }

}
