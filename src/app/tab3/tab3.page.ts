import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  memberid:any;
  reminders:any;
  
  constructor(private apiService : ApiserviceService) {
    
  }
  ionViewWillEnter(){
    this.getReminders();
  }	

  getReminders(){
    this.memberid = localStorage.getItem('memberid');
    const res = this.apiService.getData('getreminders/'+this.memberid);
    res.subscribe(results => {
      console.log(results);
      this.reminders = results.reverse();
    })
  }

}
