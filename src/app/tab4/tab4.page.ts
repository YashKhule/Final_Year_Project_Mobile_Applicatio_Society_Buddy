import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  unitnumber:any;
  transactions:any;
  loading:any;
todayDate : Date = new Date();
  constructor(private apiService : ApiserviceService,public loadingController : LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getMemberTransaction();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Fetching All Transactions...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }

  getMemberTransaction(){
    this.presentLoading();
    this.unitnumber = localStorage.getItem('unitnumber');
    const res = this.apiService.getData('getalltransactions/'+this.unitnumber);
    res.subscribe(results => {
      
      this.transactions = results.reverse();
      this.loading.dismiss();
      console.log(" transactions",this.transactions);
    })
  }

}
