import { AuthService } from './../service/auth.service';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import firebase from 'firebase/app'




@Component({
  selector: 'app-entrydetail',
  templateUrl: './entrydetail.component.html',
  styleUrls: ['./entrydetail.component.css']
})
export class EntrydetailComponent implements OnInit {
  
  hide:boolean=true;
  harddiskid="";
  userdetail:any;
  useruid:any;
  // minDate = new Date().toISOString().slice(0, 16);
  // maxDate = new Date().toISOString().slice(0, 16) ;
  // maxDate:Date;


  harddiskform:FormGroup;//kar
  
  constructor(
    @Inject(MAT_DIALOG_DATA)public data: any,
    public dialogref:MatDialogRef<EntrydetailComponent>, //fordialog open and close we use dialogRef
    public router:Router,
    public authservice:AuthService,
    private firestore:AngularFirestore,
    private formbuilder:FormBuilder,
    
  ){
   
  
    // console.log(new Date(this.minDate));
    // console.log(firebase.firestore.Timestamp.fromDate(new Date(this.minDate)));
    // let d = firebase.firestore.Timestamp.fromDate(new Date())
    // console.log(d.toDate());
   
    
    
    
    this.harddiskform=this.formbuilder.group({
      purpose:["",{validators:[Validators.required],updateOn:"change"}],
      entrydate:["",{validators:[Validators.required,Validators.max],updateOn:"change"}]
    });

    

    this.authservice.userdata.then(auth =>{
      console.log(auth.uid);
      this.useruid =auth.uid

      this.firestore.collection("userRegister", ref=>ref.where("uid", "==", this.useruid)).valueChanges().subscribe( require => {
        console.log(require);
        
          require.forEach(doc => {
          this.userdetail=doc
    
          console.log(this.userdetail);

    }) 
    
        
      })
    })

    // console.log(this.authservice.authState.uid);
    
  
   
  }

  ngOnInit():void{
    console.log("ID :",this.data.id);
    
    this.harddiskid=this.data.id;
     

      
   let d = new Date().toISOString().slice(0,10)
   this.harddiskform.patchValue({
   entrydate:d
 })
   this.harddiskform.get('entrydate').disable()
  }

  entrydetail(value:any){
    console.log(value);
    this.firestore.collection("/Harddisk").doc(this.harddiskid).update({
      name:this.userdetail.name,
      purpose:value.purpose,
      entrydate:new Date().toISOString(),
      availability:false,
      use:false,
    }).then(()=>{
      alert("Harddisk update");
      console.log("Success")
      this.dialogref.close();
    }).catch(error =>{
      console.error("error");
      alert("error")
    });
    this.router.navigateByUrl("/adm/dashboard");
    
  }
  cancel(){
    this.dialogref.close();
  }
      //new Date(this.date)
 }

