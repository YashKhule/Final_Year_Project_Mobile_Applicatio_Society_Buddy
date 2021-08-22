import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminmessagePageRoutingModule } from './adminmessage-routing.module';

import { AdminmessagePage } from './adminmessage.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminmessagePageRoutingModule,
    TranslateModule
  ],
  declarations: [AdminmessagePage]
})
export class AdminmessagePageModule {}
