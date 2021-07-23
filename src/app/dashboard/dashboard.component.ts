import { MatPaginator  } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  displayedColumns:string[] =['harddiskname','harddiskno','personname','entrydate','returndate','entry','return','edit','view','delete',];
  dataSource:any;
  harddisklist:any;



  constructor(private dialog:MatDialog,private angularFirestore: AngularFirestore,private router:Router) { }

  ngOnInit(): void {
    this.angularFirestore.collection("Harddisk").valueChanges().subscribe(required =>
      {
        console.log(required);
        this.harddisklist=required;
        this.dataSource=new MatTableDataSource(this.harddisklist);
        console.log(this.dataSource);

        this.dataSource.paginator =this.paginator;
        this.dataSource.sort=this.sort;
      });
    }
    
    onrowadd(id:any){
      console.log(id);
      this.router.navigateByUrl(`/harddisk`)
      
    }

    onrowentry(id:any){
      console.log(id);
      this.router.navigateByUrl(`/entrydetail/${id}`)
      
    }

    onrowreturn(id:any){
      console.log(id);
      this.router.navigateByUrl(`/returndetail/${id}`)
      
    }

    onrowedit(id:any){
      console.log(id);
      this.router.navigateByUrl(`/editharddiskdetail/${id}`)
      
    }
    onrowview(id:any){
      console.log(id);
      this.router.navigateByUrl(`/viewharddiskdetail/${id}`)
      
    }


    onrowdelete(id:any){
      if(confirm("Are you sure to delete thisrecord")){
        this.angularFirestore.doc('Harddisk/' +id).delete();
      }
    }


  }
  
