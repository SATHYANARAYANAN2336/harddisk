import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  

    
    constructor(private authservice:AuthService,private router:Router  ){} 

  ngOnInit(): void {
    this.dashboard()
  }
  logout()
  {
        this.authservice.signout() //we import authservice signout()function to logout  
    
        
  }
  dashboard(){
        this.router.navigateByUrl('/adm/dashboard')
  }
  inventory(){
    this.router.navigateByUrl('/adm/inventory')
  }
}
