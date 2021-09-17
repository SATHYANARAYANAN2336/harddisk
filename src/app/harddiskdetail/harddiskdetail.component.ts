import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-harddiskdetail',
  templateUrl: './harddiskdetail.component.html',
  styleUrls: ['./harddiskdetail.component.css']
})
export class HarddiskdetailComponent implements OnInit {
   hide:boolean = true;
   error ='';
   message='';
   harddiskId='';
   harddiskno="";
   array:any =[];
   ///harddisno///
   match_valid:Boolean=false;
   match_msg: any;
   ///harddisk serial
   matche_valid:Boolean=false;
   matche_msg: any;
   item:any;
   userdata


   harddiskform: FormGroup = this.formbuilder.group({
    harddiskno:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskname:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskpassword:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskcontent:["",{validators:[Validators.required],updateOn:"change"}],
    harddiskinfo:["",{validators:[Validators.required],updateOn:"change"}],
    brandname:["",{validators:[Validators.required],updateOn:"change"}],
    brandcolor:["",{validators:[Validators.required],updateOn:"change"}],
    capacity:["",{validators:[Validators.required],updateOn:"change"}],
    // harddiskstatus:["",{validators:[Validators.required],updateOn:"change"}],
    serialno:["",{validators:[Validators.required],updateOn:"change"}],
    // id:[""]

   });

  //  floatLabelControl = new FormControl('auto');

  constructor(
    public db:AngularFirestore,
    private fb: FormBuilder,
    public firestore:AngularFirestore,
    public router:Router,
    public formbuilder: FormBuilder,
    public authservice:AuthService){
      console.log(this.authservice.uid);
      
      db.collection('userRegister',ref => ref.where("uid","==",this.authservice.uid)).get().toPromise().then(snap =>
        {
          console.log(snap);
          snap.forEach(doc =>
            {
              console.log(doc.data()['admin']); //we get admin data...
              if(!doc.data()['admin']){
                this.router.navigateByUrl("/adm/dashboard")
              }
            })

            
        })
        

     }

  ngOnInit(): void {
    
  }


//   harddisk(value:any){
//     console.log();
//     const harddiskid =this.db.createId();

//     console.log(harddiskid);
//     console.log(this.harddiskform.value);
   
//     this.harddiskform.patchValue({
//       id:harddiskid
//     })
//     console.log("merge",this.harddiskform.value);

//     this.db.collection("/Harddisk").doc(harddiskid).set(
      
//     this.harddiskform.value

  
//   ).then(() =>{
    
//     window.location.reload()
//     // this.harddiskform.reset()
//     alert("Harddisk data Successfully");
//   this.router.navigateByUrl("/adm/dashboard");
    
//   }).catch(error => {
//     console.error("Error writing document",error);
//   });
  
// }

harddisk(value:any){
  if(this.harddiskform.valid){

  let docid=this.db.createId(); //create automatic id 

    this.db.collection("Harddisk",ref => ref.where("harddiskno","==",value.harddiskno)).get().toPromise().then(snap =>
      {
        console.log(snap);
        this.db.collection("Harddisk",ref => ref.where("serialno","==",value.serialno)).get().toPromise().then(res =>
          {
            if(snap.size==0 && res.size==0){
              this.db.collection('Harddisk').doc(docid).set({
                "id":docid,
                "harddiskno":value.harddiskno,
                "harddiskname":value.harddiskname,
                "harddiskpassword":value.harddiskpassword,
                "harddiskcontent":value.harddiskcontent,
                "harddiskinfo":value.harddiskinfo,
                "brandname":value.brandname,
                "brandcolor":value.brandcolor,
                "capacity":value.capacity,
                "serialno":value.serialno,
                "returndate":null, //*****refer inventory html if condition * /
                // "availability":true,
                "use":false,
                "block":false,
                "addedon":firebase.default.firestore.FieldValue.serverTimestamp()
              }).then(() =>{
                this.harddiskform.reset()
                alert("Harddisk data Successfully");
                this.router.navigateByUrl("/adm/dashboard");
              }).catch(error =>{
                console.error("Error writing document");
                alert("Error writing document");
              })
            }
            else if(snap.size!=0)
            {
                alert("Already existing harddiskno");
            }
            else if(res.size !=0)
            {
              alert("Already existing serialno");
            }
          })
        
        
      })
    }
}  


cancel(){
  this.router.navigateByUrl("/adm/dashboard")

}

/*
  this.db.collection('Harddisk').doc(docid).set({
    "id":docid,
    "harddiskno":value.harddiskno,
    "harddiskname":value.harddiskname,
    "harddiskpassword":value.harddiskpassword,
    "harddiskcontent":value.harddiskcontent,
    "harddiskinfo":value.harddiskinfo,
    "brandname":value.brandname,
    "brandcolor":value.brandcolor,
    "capacity":value.capacity,
    "serialno":value.serialno,
    "returndate":null, //*****refer inventory html if condition * /
    // "availability":true,
    // "use":true,
    "block":false,
    "addedon":firebase.default.firestore.FieldValue.serverTimestamp()
  }).then(() =>{
    this.harddiskform.reset()
    alert("Harddisk data Successfully");
    this.router.navigateByUrl("/adm/dashboard");
  }).catch(error =>{
    console.error("Error writing document");
    alert("Error writing document");
  })
  */
 

  // onChangeEvent(event: any){
  //   let match=this.array.some((item: { harddiskno:any; }) =>
  //   item.harddiskno === event.target.value)
  //   console.log(match);

  //   console.log(event.target.value);

  //   if(match)
  //   {
  //     this.match_valid=true;
  //     console.log(match);

  //     return this.match_msg="Already existing harddiskno ";
      
  //   }
  //   else
  //   {
  //     this.match_valid=false;
  //     console.log();
  //     return this.match_msg=" New Harddisknumber Created";
      
  //   }

  // }



  //   onChangeserial(event: any){
  //     let match=this.array.some((item: { serialno:any; }) =>
  //     item.serialno===event.target.value)
  //     console.log(match);
  
  //     console.log(event.target.value);
  
  //     if(match)
  //     {
  //       this.matche_valid=true;
  //       console.log(match);
  
  //       return this.matche_msg="Already Existing Serialno ";
        
  //     }
  //     else
  //     {
  //       this.matche_valid=false;
  //       console.log();
  //       return this.matche_msg=" New Serialno Created ";
        
  //     }
    
    
  // }
  
  
  
  ///
 
}



/*

      db.collection('Harddisk').get().toPromise().then( snap =>{
        console.log(snap);

        snap.forEach(doc => {
          console.log(doc.id);

          this.array.push(doc.data())
        })
        console.log(this.array);
      })
     
      
 */