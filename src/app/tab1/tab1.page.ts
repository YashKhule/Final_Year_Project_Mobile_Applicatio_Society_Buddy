import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
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
  constructor(private menu: MenuController,
              private route: Router,private apiService : ApiserviceService) { 
                
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
    this.memberid = localStorage.getItem('memberid');
    const res = this.apiService.getData('getfullaudit/'+this.memberid);
    res.subscribe(results => {
      this.auditdetails = results[0];
      this.rem_amt = this.auditdetails['rem_amount'];
      this.paid_amt = this.auditdetails['paid_amount'];
      console.log(this.auditdetails);
    })
  }
  

}
