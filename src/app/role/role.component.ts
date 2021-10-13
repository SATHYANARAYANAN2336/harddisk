import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  [x: string]: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name','checkbox','checkbox1','checkbox2'];
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
  }

  checkuser(event:any,id)
  {
    console.log(id);
    console.log(event.checked);
    if(event.checked==true)
    {
      this.db.collection("userRegister").doc(id).update({
        user:true
      });
    }
    if(event.checked==false)
    {
      this.db.collection("userRegister").doc(id).update({
      user:false
      });
    }

  }


  check(event:any,id)
    {
     console.log(id);
     console.log(event.checked);

        this.db.collection("userRegister").doc(id).update({
        admin:event.checked,
        superadmin:false
        });
      
    
    }

  checksuperadmin(event:any,id)
    {
      console.log(id);
      console.log(event.checked);
      
          this.db.collection("userRegister").doc(id).update({
          superadmin:event.checked,
          admin:false
          });
     
    }
  

}
