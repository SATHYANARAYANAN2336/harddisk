import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-entrydetail',
  templateUrl: './entrydetail.component.html',
  styleUrls: ['./entrydetail.component.css']
})
export class EntrydetailComponent implements OnInit {
  
  db:AngularFirestore;
   hide:boolean = true;
   error ='';
   message='';
   harddiskid='';
   record:any;

   harddiskform: FormGroup = this.formbuilder.group({
    harddiskno:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskname:["",{validators:[Validators.required],updateOn:"change"}],
    purpose:["",{validators:[Validators.required],updateOn:"change"}],
    personname:["",{validators:[Validators.required],updateOn:"change"}],
    entrydate:["",{validators:[Validators.required],updateOn:"change"}],
    
   });

  //  floatLabelControl = new FormControl('auto');
  constructor(
    db:AngularFirestore,
    private fb: FormBuilder,
    public firestore:AngularFirestore,
    public router:Router,
    public route:ActivatedRoute,
    public formbuilder: FormBuilder)
      
   {this.db=db; }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id); // route:router this for navigate,snapshot means it will show updated value,                                    // params means parameters we can give own name,id means it call from parameter
    this.harddiskid=this.route.snapshot.params.id; 


    this.db.collection("Harddisk").doc(this.harddiskid).get().toPromise().then((doc) => { // we set name called result
    this.record=doc.data()
    console.log(doc.data())

    
      this.harddiskform.patchValue({
        harddiskno:this.record.harddiskno,
        harddiskname:this.record.harddiskname,
      })
    });
  }
  entrydetail(value:any){
    console.log(value);
    this.db.collection("/Harddisk").doc(this.harddiskid).update(
      this.harddiskform.value
    ).then(() =>{
    }).catch(error => {
      console.error("Error",error);
    });
    alert("Harddisk data updated");
    this.router.navigateByUrl("/dashboard");
  }
 }

