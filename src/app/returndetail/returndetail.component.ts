import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-returndetail',
  templateUrl: './returndetail.component.html',
  styleUrls: ['./returndetail.component.css']
})
export class ReturndetailComponent implements OnInit {

   db:AngularFirestore;
   hide:boolean = true;
   error ='';
   message='';
   harddiskid='';
   record:any;

   harddiskform: FormGroup = this.formbuilder.group({
    harddiskno:["",{validators:[Validators.required]}],
    harddiskname:["",{validators:[Validators.required]}],
    purpose:["",{validators:[Validators.required]}],
    personname:["",{validators:[Validators.required]}],
    entrydate:["",{validators:[Validators.required]}],
    returndate:["",{validators:[Validators.required],updateOn:"change"}],

   });  
   olddata:FormGroup =this.formbuilder.group({
     purpose:[""],
     personname:[""],
     entrydate:[""],
     returndate:[""]
   });


  constructor(
    db:AngularFirestore,
    private fb: FormBuilder,
    public firestore:AngularFirestore,
    public router:Router,
    public route:ActivatedRoute,
    public formbuilder: FormBuilder
  ) {this.db=db; }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id); // route:router this for navigate,snapshot means it will show updated value,                                    // params means parameters we can give own name,id means it call from parameter
    this.harddiskid=this.route.snapshot.params.id; 


    this.db.collection("Harddisk").doc(this.harddiskid).get().toPromise().then((doc) => { // we set name called result
    this.record=doc.data()
    console.log(doc.data())

    
      this.harddiskform.patchValue({
        harddiskno:this.record.harddiskno,
        harddiskname:this.record.harddiskname,
        purpose:this.record.purpose,
        personname:this.record.personname,
        entrydate:this.record.entrydate,
      })
    });
  }
  returndetail(value:any){
    console.log(value);
    this.db.collection("/Harddisk").doc(this.harddiskid).update(
      this.harddiskform.value,
      // this.olddata.value,
    ).then(() =>{
    }).catch(error => {
      console.error("Error",error);
    });
    alert("Harddisk data updated");
    this.router.navigateByUrl("/dashboard");

  }

}
