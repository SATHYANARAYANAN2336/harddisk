import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userdata = {};//object or map

    constructor(private authservice:AuthService,private router:Router,private afs:AngularFirestore  )
    {
      console.log(this.authservice.uid)
      this.afs.collection("userRegister",ref => ref.where("uid","==",this.authservice.uid)).snapshotChanges().subscribe(snap =>
        {
          snap.forEach(doc =>{
            this.userdata=doc.payload.doc.data();
            console.log(this.userdata);
            
          })
        })
    } 

  ngOnInit(): void {
  }
  logout()
  {
        this.authservice.signout() //we import authservice signout()function to logout  
  }
  
}
