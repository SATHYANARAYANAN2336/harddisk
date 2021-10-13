import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  db:AngularFirestore;
  hide: boolean = true;
  errorMessage='';


  loginform: FormGroup = this.formbuilder.group({
    email: [, { validators: [Validators.required, Validators.email], updateOn: "change" }],
    password: [, { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" }],
  })

  floatLabelControl = new FormControl('auto');

  constructor(
    db:AngularFirestore,
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public formbuilder: FormBuilder,
    private authservice: AuthService) 
    {
      this.db=db; 
    }

  login(value:any) {
    if(this.loginform.valid)
    {
      console.log("this document created");
      this.authservice.loginWithEmail(value.email, value.password)
          .then((result) => {
            console.log(result.user.uid);
            // this.db.collection("userRegister",ref => ref.where("uid","==",result.user.uid)).
            // get().toPromise().then(data =>
            //   {
            //     console.log(data);
                
            //   })
            // alert("Successfully logged in")
            console.log("successfulley Submitted");
            this.router.navigate(['/adm/dashboard'])
          }).catch(error => {
             alert("Check your Email Id and Password and make sure you have already register")
            console.error("Document Writing Error:",error.message);
          });
    }

  }

  ngOnInit() {}

}