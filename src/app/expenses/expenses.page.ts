import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  expenses:any;

  constructor(private apiService : ApiserviceService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllExpenses();
  }

  getAllExpenses(){
    const res = this.apiService.getData('getallexpenses');
    res.subscribe(results => {
      console.log(results);
      this.expenses = results.reverse();
    })
  }

}
