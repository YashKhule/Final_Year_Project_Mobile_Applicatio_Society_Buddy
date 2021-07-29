import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminmessagePage } from './adminmessage.page';

const routes: Routes = [
  {
    path: '',
    component: AdminmessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminmessagePageRoutingModule {}
