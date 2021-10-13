import { MatPaginator  } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { EntrydetailComponent } from '../entrydetail/entrydetail.component';
import { ReturndetailComponent } from '../returndetail/returndetail.component';
import { EditharddiskdetailComponent } from '../editharddiskdetail/editharddiskdetail.component';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  displayedColumns:string[] =['harddiskno','harddiskname','harddiskinfo','entry']; //'edit','entrydate','returndate','return','edit','view','delete',
  dataSource:any;
  harddisklist:any;
  disk:any;
  userdata

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private dialog:MatDialog,private authservice : AuthService,private angularFirestore: AngularFirestore,private router:Router) {
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


      
   }

  ngOnInit() {
        this.angularFirestore.collection("Harddisk", ref=>ref.where("block","==",false).where("use","==",false).orderBy("harddiskno","asc")).valueChanges().subscribe(res=>
          {
            console.log(res);
            this.harddisklist=res;
            this.dataSource=new MatTableDataSource(this.harddisklist);
            console.log(this.dataSource);

            this.dataSource.paginator =this.paginator;
            this.dataSource.sort=this.sort;
          });
    }
    
    onrowadd(id:any){
      console.log(id);
      this.router.navigateByUrl(`adm/harddisk`)
    }

    onrowentry(id:any){
      console.log(id);
      // this.router.navigateByUrl(`/entrydetail/${id}`)
      this.dialog.open(EntrydetailComponent,{
        data:{
          id:id //id: means field and we assign id for value  
        }
      });
    }

    onrowreturn(id:any){
      console.log(id);
      // this.router.navigateByUrl(`/returndetail/${id}`)
      this.dialog.open(ReturndetailComponent,{
        data:{
          id:id
        }
      });
    }

    // onrowedit(id:any){
    //   console.log(id);
    //   this.dialog.open( EditharddiskdetailComponent,{height:'800px',
    //     data:{
    //       id:id //id: means field and we assign id for value  
    //     }
    //   });
    // }

    // onrowview(id:any){
    //   console.log(id);
    //   this.router.navigateByUrl(`/viewharddiskdetail/${id}`)
    // }

    // onrowdelete(id:any){
    //   if(confirm("Are you sure to delete thisrecord")){
    //     this.angularFirestore.doc('Harddisk/' +id).delete();
    //   }
    // }


  }
  
