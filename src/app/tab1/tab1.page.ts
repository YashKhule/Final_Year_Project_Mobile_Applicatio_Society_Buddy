import { Component } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { TranslateConfigService } from '../translate-config.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  memberid:any;
  auditdetails:any;
  rem_amt:any;
  paid_amt:any;
  loading: any;
  selectedLanguage:string;
  constructor(private menu: MenuController,
    private route: Router,
    private apiService: ApiserviceService,
    public loadingController: LoadingController,
    private translateConfigService: TranslateConfigService,)
  {
     this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Fetching Details...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }

  openEnd() {  
    this.menu.close();
  }
  ionViewWillEnter(){
    this.getMemberAudit();
  }
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

  getMemberAudit(){
    this.presentLoading();
    this.memberid = localStorage.getItem('memberid');
    const res = this.apiService.getData('getfullaudit/'+this.memberid);
    res.subscribe(results => {
      this.auditdetails = results[0];
      this.rem_amt = this.auditdetails['rem_amount'];
      this.paid_amt = this.auditdetails['paid_amount'];
      this.loading.dismiss();
      console.log(this.auditdetails);
    })
  }

  //Language 
    languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  

}
