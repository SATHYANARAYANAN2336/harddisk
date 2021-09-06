import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HarddiskdetailComponent } from './harddiskdetail/harddiskdetail.component';
import { AddharddiskComponent } from './addharddisk/addharddisk.component';
import { EditharddiskdetailComponent } from './editharddiskdetail/editharddiskdetail.component';
import { ViewharddiskdetailComponent } from './viewharddiskdetail/viewharddiskdetail.component';
import { EntrydetailComponent } from './entrydetail/entrydetail.component';
import { ReturndetailComponent } from './returndetail/returndetail.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HarddisklistComponent } from './harddisklist/harddisklist.component';
import { HistoryComponent } from './history/history.component';
import { HarddiskinuseComponent } from './harddiskinuse/harddiskinuse.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HarddiskdetailComponent,
    AddharddiskComponent,
    EditharddiskdetailComponent,
    ViewharddiskdetailComponent,
    EntrydetailComponent,
    ReturndetailComponent,
    SidenavComponent,
    InventoryComponent,
    HarddisklistComponent,
    HistoryComponent,
    HarddiskinuseComponent,
    RolesComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
