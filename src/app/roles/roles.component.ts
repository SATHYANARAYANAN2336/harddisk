import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  [x: string]: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name','checkbox1','checkbox','checkbox2'];
  dataSource: any;
  user
  constructor(private authservice:AuthService,private dialog:MatDialog,private db:AngularFirestore,private router:Router) 
  {}
  

  ngOnInit(): void {
    this.db.collection("userRegister").valueChanges().subscribe(required =>
      {
        console.log(required);
        this.harddisklist=required;
        this.dataSource=new MatTableDataSource(this.harddisklist);
        console.log(this.dataSource);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      });
        this.authservice.userdata.then(result =>
          {
            console.log(result.uid);
            this.res=result.uid;
            console.log(this.res);
            
          })

  }
  check(event:any,id)
  {
    console.log(id);
    console.log(event.checked);

    if(event.checked==true)
    {
      this.db.collection("userRegister").doc(id).update({
        admin:true
      });
    }
    if(event.checked==false)
    {
      this.db.collection("userRegister").doc(id).update({
        admin:false
      });
    }
    
    
  }

  checkemp(event:any,id){
    console.log(id);
    console.log(event.checked);
    if(event.checked==true)
    {
      this.db.collection("userRegister").doc(id).update({
        employee:true
      });
    }
    if(event.checked==false)
    {
      this.db.collection("userRegister").doc(id).update({
        employee:false
      });
    }

  }
    

    checksuperadmin(event:any,id)
    {
      console.log(id);
      console.log(event.checked);
      if(event.checked==true)
      {
        this.db.collection("userRegister").doc(id).update({
          superadmin:true
        });
      }
      if(event.checked==false)
      {
        this.db.collection("userRegister").doc(id).update({
          superadmin:false
        });
      }
    }
  

}
