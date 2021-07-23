import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-harddiskdetail',
  templateUrl: './harddiskdetail.component.html',
  styleUrls: ['./harddiskdetail.component.css']
})
export class HarddiskdetailComponent implements OnInit {
   db:AngularFirestore;
   hide:boolean = true;
   error ='';
   message='';
   harddiskId='';


   harddiskform: FormGroup = this.formbuilder.group({
    harddiskno:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskname:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskcontent:[,{validators:[Validators.required],updateOn:"change"}],
    brandname:["",{validators:[Validators.required],updateOn:"change"}],
    brandcolor:["",{validators:[Validators.required],updateOn:"change"}],
    capacity:["",{validators:[Validators.required],updateOn:"change"}],
    serialno:["",{validators:[Validators.required],updateOn:"change"}],
    id:[""]

   });

  //  floatLabelControl = new FormControl('auto');

  constructor(
    db:AngularFirestore,
    private fb: FormBuilder,
    public firestore:AngularFirestore,
    public router:Router,
    public formbuilder: FormBuilder){
      this.db=db;
    
      
     }

  ngOnInit(): void {

  }
  
  harddisk(value:any){
    console.log();

    
    const harddiskid =this.db.createId();


    console.log(harddiskid);
    console.log(this.harddiskform.value);
   
    this.harddiskform.patchValue({
      id:harddiskid
    })
    console.log("merge",this.harddiskform.value);

    
    this.db.collection("/Harddisk").doc(harddiskid).set(
      
    
    this.harddiskform.value

    
    
    
  ).then(() =>{
    window.location.reload()
    // this.harddiskform.reset()
    
    
  }).catch(error => {
    console.error("Error writing document",error);
  });
  alert("Harddisk data Successfully");
  this.router.navigateByUrl("/dashboard");
}

}
