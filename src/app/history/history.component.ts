import { MatPaginator  } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  displayedColumns:string[] =['harddiskno','harddiskname','name','purpose','entrydate','returndate']; //'entry','returndate','edit','view','delete',
  dataSource = new MatTableDataSource();
  harddisklist:any;
  returnhistorylist = []
  username
  useruid

  

      applyFilter(event: Event) 
      {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    
      update(event)
      {
        console.log(event.target.value);
        var date = new Date(event.target.value);
        var start = new Date(date.setHours(0, 0, 0))
        var end = new Date (date.setHours(23,59,59))
        console.log(new Date(event.target.value));
        this.dataSource.data=this.returnhistorylist.filter((item:any) =>
          {
            return item.returndate.toDate().getTime() >= start.getTime() &&
            item.returndate.toDate().getTime() <= end.getTime();
          });
      }
    



  constructor(private dialog:MatDialog,private angularFirestore: AngularFirestore,
    private router:Router,private authservice : AuthService) {
    //   this.authservice.userdata.then( auth => {
    //   console.log(auth.uid);
    //   this.useruid = auth.uid
      
      
    // })
     }

  ngOnInit(): void 
  
  {

    this.angularFirestore.collection("return-history",ref => ref.orderBy("returndate","desc")).get().toPromise().then(snap => {
      this.returnhistorylist = [] //empty array beacuse duplicate will not be come
      console.log(snap);
      
      snap.forEach(doc => 
        {
           console.log(doc.data());
           this.returnhistorylist.push(doc.data()) //we push doc.data() to returnhistorylist
        })
      
        this.dataSource=new MatTableDataSource(this.returnhistorylist)
        this.dataSource.paginator =this.paginator;
      
        });
    
  }

}
