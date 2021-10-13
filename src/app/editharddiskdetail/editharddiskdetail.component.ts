import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from './../service/auth.service';

import {ActivatedRoute, Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-editharddiskdetail',
  templateUrl: './editharddiskdetail.component.html',
  styleUrls: ['./editharddiskdetail.component.css']
})
export class EditharddiskdetailComponent implements OnInit {
  db:AngularFirestore;
   hide:boolean = true;
   error ='';
   message='';
   harddiskid:any;
   record:any;


   harddiskform: FormGroup = this.formbuilder.group({
    harddiskno:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskname:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskpassword:["",{validators:[],updateOn:"change"}],
    harddiskinfo:["",{validators:[Validators.required],updateOn:"change"}],
    brandname:["",{validators:[Validators.required],updateOn:"change"}],
    brandcolor:["",{validators:[Validators.required],updateOn:"change"}],
    capacity:["",{validators:[Validators.required],updateOn:"change"}],
    serialno:["",{validators:[Validators.required],updateOn:"change"}],
    id:[,]

   });

   

  constructor(
    @Inject(MAT_DIALOG_DATA)public data: any,
    public dialogref:MatDialogRef<EditharddiskdetailComponent>,
    db:AngularFirestore,
    public authservice:AuthService,
    private fb: FormBuilder,
    public firestore:AngularFirestore,
    public router:Router,
    public route:ActivatedRoute,
    public formbuilder: FormBuilder){
      this.db=db; 
    
    
    }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id); // route:router this for navigate,snapshot means it will show updated value,                                    // params means parameters we can give own name,id means it call from parameter
    this.harddiskid=this.data.id;



    this.db.collection("Harddisk").doc(this.harddiskid).get().toPromise().then((doc) => { // we set name called result
    this.record=doc.data()
    console.log(doc.data())

    
      this.harddiskform.patchValue({
        harddiskno:this.record.harddiskno,
        harddiskname:this.record.harddiskname,
        harddiskpassword:this.record.harddiskpassword,
        harddiskinfo:this.record.harddiskinfo,
        brandname:this.record.brandname,
        brandcolor:this.record.brandcolor,
        capacity:this.record.capacity,
        serialno:this.record.serialno,
        id:this.record.id,
      }) 
  });

  }
  
  
  editharddisk(value:any){
  
    console.log();
    this.db.collection("/Harddisk").doc(this.harddiskid).update(
      this.harddiskform.value
    ).then(() =>{
      alert("Harddisk data updated");
      this.dialogref.close();
    }).catch(error => {
      console.error("error");
      alert("error")

    });
    this.router.navigateByUrl("/adm/dashboard");

  }

    cancel(){
      this.dialogref.close();
    }
    
 }
    
   
   


    
//     this.db.collection("/Harddisk").doc().update(
      

    
    
    
//   ).then(() =>{
//     window.location.reload()
//     // this.harddiskform.reset()
    
    
//   }).catch(error => {
//     console.error("Error writing document",error);
//   });
//   alert("Harddisk data Successfully");
  
 