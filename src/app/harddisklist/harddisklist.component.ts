import { MatPaginator  } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { EditharddiskdetailComponent } from '../editharddiskdetail/editharddiskdetail.component';


@Component({
  selector: 'app-harddisklist',
  templateUrl: './harddisklist.component.html',
  styleUrls: ['./harddisklist.component.css']
})
export class HarddisklistComponent implements OnInit {
  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

 displayedColumns:string[] =['harddiskno','harddiskname','harddiskinfo','brandname','brandcolor','capacity','serialno','harddiskpassword','block','edit']; 
  dataSource:any;
  harddisklist:any;
  returnhistorylist = []
  username
  useruid
  userdata


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  constructor(private dialog:MatDialog,private angularFirestore: AngularFirestore,
    private router:Router,private authservice : AuthService) {
      this.angularFirestore.collection("userRegister",ref => ref.where("uid","==",this.authservice.uid)).get().toPromise().then( snap => {
          console.log(snap);
            snap.forEach(doc => {
                this.userdata=doc 
                console.log(this.userdata);
                if (!this.userdata.data()['superadmin']) {
                this.displayedColumns.splice(this.displayedColumns.length-2)    
                }
                if(!doc.data()['admin'] && !doc.data()['superadmin'] ){
                  this.router.navigateByUrl("/adm/dashboard")
                }           
            })
          })
     }

  ngOnInit(): void {
    this.angularFirestore.collection("Harddisk",ref => ref .orderBy("harddiskno","asc")).valueChanges().subscribe(res=>
      {
        console.log(res);
        this.harddisklist=res;
        this.dataSource=new MatTableDataSource(this.harddisklist);
        console.log(this.dataSource);

        this.dataSource.paginator =this.paginator;
        this.dataSource.sort=this.sort;
      });
  }

  check(event:any,id)
  {
    console.log(id);
    console.log(event.checked);
    if(event.checked==true)
    {
      this.angularFirestore.collection("Harddisk").doc(id).update({
        block:true,
      });
    }
    if(event.checked==false)
    {
      this.angularFirestore.collection("Harddisk").doc(id).update({
        block:false,
      });
    }
  }


  onrowedit(id:any){
    console.log(id);
    this.dialog.open( EditharddiskdetailComponent,{height:'800px',
      data:{
        id:id //id: means field and we assign id for value  
      }
    });
  }

  onrowblock(){}

  onrowunblock(){}

}
