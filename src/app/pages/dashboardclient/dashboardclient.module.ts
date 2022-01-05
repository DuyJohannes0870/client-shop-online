import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardclientRoutingModule } from './dashboardclient-routing.module';
import { DashboardclientComponent } from './dashboardclient.component';





// import { ContainerHeaderComponent } from '../../components/container-header/container-header.component';

import { environment } from "../../../environments/environment";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from "@angular/fire/storage";





@NgModule({
  declarations: [
    DashboardclientComponent,
    // ContainerHeaderComponent,

  ],
  imports: [
    CommonModule,
    DashboardclientRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class DashboardclientModule { }
