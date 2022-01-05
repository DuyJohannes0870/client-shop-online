import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardclientComponent } from './dashboardclient.component';
import { TableclientComponent } from '../../components/tableclient/tableclient.component';


const routes: Routes = [
  { path: '', component: DashboardclientComponent },
  { path: 'tableclient', component: TableclientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardclientRoutingModule { }
