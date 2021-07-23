import { EntrydetailComponent } from './entrydetail/entrydetail.component';
import { EditharddiskdetailComponent } from './editharddiskdetail/editharddiskdetail.component';
import { HarddiskdetailComponent } from './harddiskdetail/harddiskdetail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewharddiskdetailComponent } from './viewharddiskdetail/viewharddiskdetail.component';
import { ReturndetailComponent } from './returndetail/returndetail.component';

const routes: Routes = [
  { path: '',redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'dashboard', component:DashboardComponent },
  { path: 'harddisk', component:HarddiskdetailComponent},
  { path:'editharddiskdetail/:id', component:EditharddiskdetailComponent},
  { path:'viewharddiskdetail/:id', component:ViewharddiskdetailComponent},
  {path:'entrydetail/:id', component:EntrydetailComponent},
  {path:'returndetail/:id', component:ReturndetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }