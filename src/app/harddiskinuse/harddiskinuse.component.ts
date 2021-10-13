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

    update(event)
    {
      console.log(event.target.value);
      var date = new Date(event.target.value);
      var start = new Date(date.setHours(0, 0, 0))
      var end = new Date (date.setHours(23,59,59))
      console.log(new Date(event.target.value));
      this.dataSource.data=this.harddisklist.filter((item:any) =>
        {
          return item.entrydate.toDate().getTime() >= start.getTime() &&
          item.entrydate.toDate().getTime() <= end.getTime();
        });
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

    this.angularFirestore.collection("userRegister",ref => ref.where("uid","==",this.authservice.uid)).get().toPromise().then( snap => {
      console.log(snap);
        snap.forEach(doc => {
            this.userdata=doc 
            console.log(this.userdata);
            if(!doc.data()['admin'] && !doc.data()['superadmin'] ){
              this.router.navigateByUrl("/adm/dashboard")
            }           
        })
      })

    this.angularFirestore.collection("Harddisk",ref => ref.where("use","==",true).orderBy("harddiskno","asc")).valueChanges().subscribe(res=>
      {
       console.log(res);
       this.harddisklist=res;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ;
       
       this.dataSource=new MatTableDataSource(this.harddisklist);
       console.log(this.dataSource);

       this.dataSource.paginator =this.paginator;
       this.dataSource.sort=this.sort;
      });
   }

  ngOnInit(): void {}
}
