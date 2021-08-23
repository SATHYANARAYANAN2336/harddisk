import { MatPaginator  } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { EntrydetailComponent } from '../entrydetail/entrydetail.component';
import { ReturndetailComponent } from '../returndetail/returndetail.component';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  [x:string]:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  displayedColumns:string[] =['harddiskname','harddiskno','purpose','entrydate','return']; //'entry','returndate','edit','view','delete',
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
    private router:Router,private authservice : AuthService) {
    this.authservice.userdata.then( auth => {
      console.log(auth.uid);
      this.useruid = auth.uid
    })
  
     }


  ngOnInit(): void {

    
      
    this.angularFirestore.collection("userRegister",ref => ref.where("uid","==",this.useruid)).get().toPromise().then( snap => {
      console.log(snap);
        snap.forEach(doc => {
          console.log(doc.data()['name']); //we need to check
          this.username = doc.data()['name']
        })
          
      ///
       this.angularFirestore.collection("Harddisk", ref=>ref.where("availability", "==", false).where("name","==",this.username)).valueChanges().subscribe(async res=>
      {
        console.log(res);
        this.harddisklist=res;
        await this.angularFirestore.collection("return-history",ref=>ref.where("uid","==",this.useruid)).get().toPromise().then(snap => {
          this.returnhistorylist = [] //empty array beacuse duplicate will not be come
          snap.forEach(doc => {
               console.log(doc.data());
               this.returnhistorylist.push(doc.data()) //we push doc.data() to returnhistorylist
               
          })

        
        
        
        this.mergeddata = [...this.harddisklist,...this.returnhistorylist] //spread operator array irukura all object
        console.log(this.mergeddata);
        
        this.dataSource=new MatTableDataSource(this.mergeddata);
        console.log(this.dataSource);

        this.dataSource.paginator =this.paginator;
        this.dataSource.sort=this.sort;
      });
      
      
    })

  })
    
    

   
    }
    
    onrowadd(id:any){
      console.log(id);
      this.router.navigateByUrl(`/harddisk`)
      
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