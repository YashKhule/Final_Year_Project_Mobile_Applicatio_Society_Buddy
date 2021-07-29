import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  expenses:any;
  loading:any;
  constructor(private apiService : ApiserviceService,public loadingController : LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllExpenses();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: 'Fetching All Expenses...',
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }

  getAllExpenses(){
    this.presentLoading();
    const res = this.apiService.getData('getallexpenses');
    res.subscribe(results => {
      console.log(results);
      this.expenses = results.reverse();
      this.loading.dismiss();
    })
  }

}
