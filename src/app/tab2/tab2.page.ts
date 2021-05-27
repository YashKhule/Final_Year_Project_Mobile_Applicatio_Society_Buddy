import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  notices:any;

  constructor(private apiService : ApiserviceService) {
    
  }
  ionViewWillEnter(){
    this.getNotices();
  }	
 todayDate : Date = new Date();

 getNotices(){
   const res = this.apiService.getData('getnotice');
   res.subscribe(results => {
     console.log("orginial",results);
    this.notices = results.reverse();
    console.log("notices are",this.notices);
   })
 }
}
