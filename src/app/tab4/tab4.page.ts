import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  unitnumber:any;
  transactions:any;
todayDate : Date = new Date();
  constructor(private apiService : ApiserviceService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getMemberTransaction();
  }

  getMemberTransaction(){
    this.unitnumber = localStorage.getItem('unitnumber');
    const res = this.apiService.getData('getalltransactions/'+this.unitnumber);
    res.subscribe(results => {
      
      this.transactions = results.reverse();
      console.log(" transactions",this.transactions);
    })
  }

}
