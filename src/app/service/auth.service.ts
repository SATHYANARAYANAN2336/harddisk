import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {first} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate{
  activateScreen = false
  uid;
  pid;
  username : any
  authState: any = null;
  user;
  userdata


  constructor(private afu: AngularFireAuth, private router: Router
    ,private afs : AngularFirestore) { 

     this.afu.authState.subscribe((auth =>{
        this.authState = auth;
        // console.log(this.authState.uid)
      
      }))

   this.userdata = this.afu.authState.pipe(first()).toPromise() //userdata = whenever it call
   console.log(this.userdata);
   
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.afu.user.subscribe(user=>{
    if(user != null){
      this.uid = user.uid
    }
    })
    return this.afu.user.pipe(
      take(1),
      map(user => !!user),
    tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied: authguard')
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        }
      })
    )
  }
       
       async setUid(value){
             this.uid = value
         }
           async getuid(){
             console.log(this.uid)
             return this.uid
           }
  
  



registerWithEmail( email: string, password: string ) {
    return this.afu.createUserWithEmailAndPassword( email, password)
      .then((user) => {
        this.authState = user
        return user
      })
      .catch(error => {
        console.log(error.message)
        throw error
      });
  }


  loginWithEmail(email: string, password: string)
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error.message)
        throw error.message
      });
  }

    signout(): void
  {
    let out = confirm('are you sure want to logout')
    console.log(out);
     if(out){
      this.afu.signOut();
      this.router.navigate(['/login']);
     }
  }
  
    
    
  


}

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { Observable } from 'rxjs';
// import { take, map, tap } from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase/app';
// import {first} from 'rxjs/operators'

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService implements CanActivate {
//   activateScreen = false
//   authState: any = null;
//   userdata:any;
//   uid
//   pid
//   constructor(public firestore : AngularFirestore, public afu : AngularFireAuth, public router : Router) {

//     this.userdata = this.afu.authState.pipe(first()).toPromise()

//    }
//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     this.afu.user.subscribe(user=>{
//       if(user != null){
//         this.uid = user.uid
//       }
//     })
//     return this.afu.user.pipe(
//       take(1),
//       map(user => !!user),
//       tap(loggedIn => {
//         if (!loggedIn) {
//           console.log('access denied: authguard')
//           this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
//         }
//       })
//     )
//   }
//   async setUid(value){
//     this.uid = value
//   }
//   async getuid(){
//     console.log(this.uid)
//     return this.uid
//   }
//   registerWithEmail( email: string, password: string ) {
//     return this.afu.createUserWithEmailAndPassword( email, password)
//       .then((user) => {
//         this.authState = user
//         console.log(user);
//         return user
//       })
//       .catch(error => {
//         console.log(error.message)
//         throw error
//       });
//   }
//   loginWithEmail(email: string, password: string)
//   {
//     return this.afu.signInWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.authState = user
//       })
//       .catch(error => {
//         console.log(error.message)
//         throw error.message
//       });
//   }
//   resetPassword(email:string){
//     return this.afu.sendPasswordResetEmail(email).then(()=>{
// console.log('reset password link sent successfully');
//     }).catch(error => {
//       console.log(error.message)
//       throw error.message
//     });
//   }
//     signout(): void
//   {
//     let out = confirm('are you sure want to logout')
//     console.log(out);
//      if(out){
//       this.afu.signOut();
//       this.router.navigate(['/login']);
//      }
//   }
//   // async getRoles(){
//   //   var roles
//   //   await this.firestore.collection("profile_data", ref=>ref.where("user_ref", "==", this.firestore.collection("user_data").doc(this.uid).ref)).get().toPromise().then(async profileData=>{
//   //     roles = (await this.firestore.doc(profileData.docs[0].data()['role_ref']['path']).get().toPromise()).data()
//   //   })
//   //   return roles
//   // }
// }