import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import {Router} from '@angular/router';
import {AngularFirestore }from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  db:AngularFirestore;
  hide: boolean = true;
  error= '';
  message='';
  

  registerform: FormGroup = this.formbuilder.group({
    name: [, { validators: [Validators.required], updateOn: "change" }],
    number: [, { validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)], updateOn: "change" }],
    email: [, { validators: [Validators.required, Validators.email], updateOn: "change" }],
    password: [, { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" }],
    confirmpassword: [, { validators: [Validators.required, Validators.minLength(6)], updateOn: "change" }],
  });

  // floatLabelControl = new FormControl('auto');

  constructor(
    db:AngularFirestore,
    public firestore: AngularFirestore,
    private authservice: AuthService,
    public router: Router,
    public formbuilder: FormBuilder) {
      this.db=db;
    }

    ngOnInit() {
    }

  register(value:any) {
    if(this.registerform.valid){
      
    
    console.log("this document created",value);
       this.authservice.registerWithEmail(value.email, value.password)
          .then((v) => {
            console.log(v.user.uid);
            // if(this.registerform.valid){
            //   return;
            // }
            this.onSubmit(value,v.user.uid)
            // this.message = "you are register with data on firebase"
            this.router.navigate(['/login'])
          }).catch(_error => { 
            alert(_error.message)
            this.error = _error
            this.router.navigate(['/register'])
          })
        }
  }


  checkpassword(){
    if(this.registerform.controls.password.value == this.registerform.controls.confirmpassword.value){
      this.registerform.controls.confirmpassword.setErrors(null)
    }
    else{
      this.registerform.controls.confirmpassword.setErrors({error : true})
    }
  }

  onSubmit(value:any,uid){
    console.log(value);
    const registerId = this.db.createId();
    this.db.doc('/userRegister/'+registerId).set({
      id:registerId,
      uid:uid,
      name:value.name,
      number:value.number,
      email:value.email,
      user:true
    })
    .then(() => {
      console.log("successfully submitted");
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error("Document Writing Error:",error);
    });
    }

    

}

