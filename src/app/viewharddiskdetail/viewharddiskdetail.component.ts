import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-viewharddiskdetail',
  templateUrl: './viewharddiskdetail.component.html',
  styleUrls: ['./viewharddiskdetail.component.css']
})
export class ViewharddiskdetailComponent implements OnInit {
    db:AngularFirestore;
    hide:boolean= true;
    error='';
    message='';
    harddiskid:any;
    record:any;


    harddiskform: FormGroup = this.formbuilder.group({
      harddiskno:["",{validators:[Validators.required]}],
      harddiskname:["",{validators:[Validators.required]}],
      harddiskcontent:[,{validators:[Validators.required]}],
      brandname:["",{validators:[Validators.required]}],
      brandcolor:["",{validators:[Validators.required]}],
      capacity:["",{validators:[Validators.required]}],
      serialno:["",{validators:[Validators.required]}],
      id:[,]
  
     });

     floatLabelControl = new FormControl('auto');

  constructor(
    db:AngularFirestore,
    public firestore:AngularFirestore,
    public router:Router,
    private fb: FormBuilder,
    public route:ActivatedRoute,
    public formbuilder:FormBuilder) {
      this.db=db;
    
    
    }

    ngOnInit(): void {
      console.log(this.route.snapshot.params.id); // route:router this for navigate,snapshot means it will show updated value,                                    // params means parameters we can give own name,id means it call from parameter
      this.harddiskid=this.route.snapshot.params.id; 
  
  
      this.db.collection("Harddisk").doc(this.harddiskid).get().toPromise().then((doc) => { // we set name called result
      this.record=doc.data()
      console.log(doc.data())
  
      
        this.harddiskform.patchValue({
          harddiskno:this.record.harddiskno,
          harddiskname:this.record.harddiskname,
          harddiskcontent:this.record.harddiskcontent,
          brandname:this.record.brandname,
          brandcolor:this.record.brandcolor,
          capacity:this.record.capacity,
          serialno:this.record.serialno,
  
        }) 
    });
  
    }
    back(){
      this.router.navigateByUrl(`/adm/dashboard`)
    }

}
