import { MatPaginator  } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntrydetailComponent } from '../entrydetail/entrydetail.component';
import { ReturndetailComponent } from '../returndetail/returndetail.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-harddisklist',
  templateUrl: './harddisklist.component.html',
  styleUrls: ['./harddisklist.component.css']
})
export class HarddisklistComponent implements OnInit {
  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  displayedColumns:string[] =['harddiskno','harddiskname','block','unblock']; 
  dataSource:any;
  harddisklist:any;
  returnhistorylist = []
  username
  useruid


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  constructor(private dialog:MatDialog,private angularFirestore: AngularFirestore,
    private router:Router,private authservice : AuthService) { }

  ngOnInit(): void {
  }

  onrowblock(){
    
  }

  onrowunblock(){

  }

}
