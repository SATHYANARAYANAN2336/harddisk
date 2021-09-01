import { HistoryComponent } from './history/history.component';
import { HarddisklistComponent } from './harddisklist/harddisklist.component';
import { AuthService } from './service/auth.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { EntrydetailComponent } from './entrydetail/entrydetail.component';
import { EditharddiskdetailComponent } from './editharddiskdetail/editharddiskdetail.component';
import { HarddiskdetailComponent } from './harddiskdetail/harddiskdetail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewharddiskdetailComponent } from './viewharddiskdetail/viewharddiskdetail.component';
import { ReturndetailComponent } from './returndetail/returndetail.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HarddiskinuseComponent } from './harddiskinuse/harddiskinuse.component';
const routes: Routes = [
  { path: '',redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adm', component:SidenavComponent,canActivate:[AuthService], children:[
  { path:'dashboard', component:DashboardComponent,canActivate:[AuthService] },
  { path:'inventory',component:InventoryComponent,canActivate:[AuthService]},
  { path:'harddisklist',component:HarddisklistComponent,canActivate:[AuthService]},
  { path:'harddiskinuse',component:HarddiskinuseComponent,canActivate:[AuthService]},
  { path:'history',component:HistoryComponent,canActivate:[AuthService]},
  { path: 'harddisk',component:HarddiskdetailComponent,canActivate:[AuthService]},
  ]},
  
  { path:'editharddiskdetail/:id', component:EditharddiskdetailComponent},
  { path:'viewharddiskdetail/:id', component:ViewharddiskdetailComponent},
  {path:'entrydetail/:id', component:EntrydetailComponent},
  {path:'returndetail/:id', component:ReturndetailComponent},
  { path: 'login', component: LoginComponent },
  { path:'sidenav', component:SidenavComponent,canActivate:[AuthService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }