import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-adminmessage',
  templateUrl: './adminmessage.page.html',
  styleUrls: ['./adminmessage.page.scss'],
})
export class AdminmessagePage implements OnInit {
  loading:any;
  new_message:boolean = true;
  messages:any;
  constructor(private apiService : ApiserviceService,public loadingController:LoadingController,private alertController : AlertController) { }

  ngOnInit() {
  }

  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingclass',
      message: msg,
      spinner:'bubbles'
    
    });
    await this.loading.present();

    
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  switchchoice(val){
    console.log("in switch choice",val);
    if(val == "nmsg"){
      this.new_message = true;
    }else{
      this.new_message = false;
      this.getMessageByMemberId();
    }
  }

  getMessageByMemberId(){
    console.log("in get message");
    this.presentLoading("Getting All Messages");
    const data = {
      "member_id":localStorage.getItem("memberid")
    }
    const res = this.apiService.postData('getmessages',JSON.stringify(data));
    res.subscribe(results => {
      console.log(results);
      this.messages = results;
      this.messages.sort(function(a,b){
        return b.message_id - a.message_id
      })
      this.loading.dismiss();
    },err => {
      this.loading.dismiss();
      this.presentAlert("Cannot Retrieve Messages");
    })
  }

  sendMessage(){
    console.log("in send message");
    
    if(document.getElementsByTagName('ion-textarea')[0].value == '' || document.getElementsByTagName('ion-textarea')[1].value == ''){
      this.presentAlert("Please Fill All The Fields To Send Message");
    }else{
      this.presentLoading("Sending Message To Secretary");
      const data = {
        "member_id": localStorage.getItem('memberid'),
        "membername": localStorage.getItem('membername'),
        "message_subject": document.getElementsByTagName('ion-textarea')[0].value,
        "message_body": document.getElementsByTagName('ion-textarea')[1].value  
      }
      const res = this.apiService.postData('sendmessage',JSON.stringify(data));
      res.subscribe(results => {
        console.log("Message Send");
        document.getElementsByTagName('ion-textarea')[0].value = '';
        document.getElementsByTagName('ion-textarea')[1].value = '';
        this.presentAlert("Message Send SuccessFully !!")
        this.loading.dismiss();
      },err => {
        this.presentAlert("Cannot send message");
        this.loading.dismiss();
      })
    }
  }

}
