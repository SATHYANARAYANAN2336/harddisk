import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

email="";  
  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {}

  resetPassword(email:string)
  {
      this.authservice.resetPassword(this.email)
      .then(() =>{ 
      alert("Please Check your email");
      this.router.navigateByUrl('/login')
      })
      
  }

}
