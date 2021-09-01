import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../service/auth.service';
import firebase from 'firebase';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-returndetail',
  templateUrl: './returndetail.component.html',
  styleUrls: ['./returndetail.component.css']
})
export class ReturndetailComponent implements OnInit {

   db:AngularFirestore;
   hide:boolean = true;
   harddiskid='';
   record:any;
   userdetail:any;
   username
   useruid

   harddiskform: FormGroup = this.formbuilder.group({
    
    returndate:["",{validators:[Validators.required],updateOn:"change"}],

   });  
  


  constructor(
    @Inject(MAT_DIALOG_DATA)public data: any, // here we call from dashboard component
    public dialogref:MatDialogRef<ReturndetailComponent>, //fordialog open and close we use dialogRef
   
    private authservice:AuthService,
    public firestore:AngularFirestore,
    public router:Router,
    public formbuilder: FormBuilder
  ) {
    this.authservice.userdata.then( auth => {
      console.log(auth.uid);
      this.useruid = auth.uid;
///
      this.firestore.collection("userRegister", ref=> ref.where("uid","==",this.useruid)).valueChanges().subscribe(require =>{
        console.log(require);
  
        require.forEach(doc =>{
          this.userdetail=doc
          console.log(this.userdetail);
          })
      })
      ///
    });
    // console.log(this.authservice.authState.uid);
   
  
  
  }

  ngOnInit(): void {

    let d = new Date().toISOString().slice(0,10)
   this.harddiskform.patchValue({
   returndate:d
 })
   this.harddiskform.get('returndate').disable()

    console.log(this.data.id); // here we call from dashboard component entry button we pass data and id and we fetch that data and id here
    this.harddiskid=this.data.id; 
    this.firestore.collection("Harddisk").doc(this.harddiskid).get().toPromise().then((doc) => { // we set name called result
    this.record=doc.data()
    console.log(doc.data())
    });
  }
  returndetail(value:any){
    console.log(value);
    console.log(this.record)
    
    let docid1=this.firestore.createId();
    this.firestore.collection('return-history').doc(docid1).set({
      id:docid1,
      uid:this.userdetail.uid,
      name:this.userdetail.name,
      harddiskid:this.harddiskid,
      harddiskno:this.record.harddiskno,
      harddiskname:this.record.harddiskname,
      purpose:this.record.purpose,
      entrydate:this.record.entrydate,
      returndate:new Date().toISOString(), //new value
      
      
    }).then(() =>{
      this.dialogref.close(DashboardComponent)
      this.firestore.collection("/Harddisk").doc(this.harddiskid).update({
       name:"",
       purpose:"",
       entrydate:"",
       returndate:"",
       availability:true,
       use:true,
      })
    }).catch(error => {
      console.error("Error",error);
    });
    alert("Harddisk data updated");
    // this.router.navigateByUrl("/adm/dashboard");

  }


  cancel(){
    this.dialogref.close(); //see 37 line   

  }

}
