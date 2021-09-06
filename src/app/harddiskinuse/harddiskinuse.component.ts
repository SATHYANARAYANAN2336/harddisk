import { FormBuilder } from '@angular/forms';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-harddiskinuse',
  templateUrl: './harddiskinuse.component.html',
  styleUrls: ['./harddiskinuse.component.css']
})
export class HarddiskinuseComponent implements OnInit {

  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  harddiskid="";
  displayedColumns:string[]=['harddiskno','harddiskname','name','purpose'];
  dataSource:any;
  harddisklist:any;
  returnhistorylist = []
  username

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    
    private angularFirestore:AngularFirestore,
    private router:Router,
    public authservice:AuthService,
    private firestore:AngularFirestore,
    private formbuilder:FormBuilder) 
   { 
    this.authservice.userdata.then(auth => {
      console.log(auth.uid);
      this.userid =auth.uid
    });


    this.angularFirestore.collection("Harddisk",ref => ref.where("block","==",true)).valueChanges().subscribe(res=>
      {
        // this.harddisklist=[ ]
       console.log(res);
       this.harddisklist=res;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ;
       
       this.dataSource=new MatTableDataSource
       (this.harddisklist);
       console.log(this.dataSource);

       this.dataSource.paginator =this.paginator;
       this.dataSource.sort=this.sort;
           });
   }

  ngOnInit(): void {}

}
