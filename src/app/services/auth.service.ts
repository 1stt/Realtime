import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { NgZone } from "@angular/core";

// import { AlertService } from 'src/app/shareds/services/alert.service';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  authState: any = null;
  userRef: AngularFireObject<any>;

  userData: any;



  constructor(   
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private db: AngularFireDatabase,
    private zone: NgZone
    // private alert: AlertService
    ) { 
      // this.afAuth.authState.subscribe((auth) => {
      //   this.authState = auth
      //   });
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }

     // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.zone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.update();
      }).catch((error) => {
        window.alert(error.message)
      })
  }

   // Sign up with email/password
   SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.update();
      }).catch((error) => {
        window.alert(error.message)
      })
  }

   // Send email verfificaiton when new user sign up
   SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  private update(): void {
    const path =`users/${this.currentUserId}`;
     // Endpoint on firebase  this.router.navigate(['auth',`/editWiki/${data.key}`]);
    const userRef: AngularFireObject<any> = this.db.object(path);
    
  const data = {
      email: this.userData.email,
      name: this.userData.displayName
    }
    console.log("YYYYYYYY")
  userRef.update(data)
      .catch(error => console.log(error));
  }
  
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


 // Sign out 
 SignOut() {
  return this.afAuth.auth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  })
}








     //เข้าสู่ระบบ
     login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
              this.authState = user
              // this.alert.notify('ออกจากระบบสำเร็จ', 'info');
              // if(!user)return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
              // this.updateUserData()
              // this.router.navigate(['membercreate'])
              this.zone.run(() => {
                console.log('loginแล้วจ้าาาา')
                this.router.navigate(['membercreate']);
            });
              // this.alert.notify('เข้าสู่ระบบ','info');
            })
        .catch(err => {
        
          console.log('Something went wrong:',err.message);
          // this.router.navigate(['reg']);
          this.zone.run(() => {
            this.router.navigate(['reg']);
        });
          // this.alert.notify('ไม่มีผู้ใช้นี้ในระบบ','info');
        });
    }



    //สมัครสมาชิก
    signup(email: string, password: string){
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.SendVerificationMail();

        this.updateUserData()
        this.zone.run(() => {
          console.log("สมัครสมาชิก")
          // this.router.navigate(['membercreate']);
      });
      })
      .catch(error => console.log(error));
  }

  //  // Send email verfificaiton when new user sign up
  //  SendVerificationMail() {
  //   return this.afAuth.auth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

    get authenticated(): boolean {
      return this.authState !== null;
    }
  
  get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }
  
  getCurrentLoggedIn() {
      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.zone.run(() => {
            // console.log(55555555555)
            this.router.navigate(['/']);
        });
        }
      });
    }

  
  signOut(): void {
      this.afAuth.auth.signOut();
      // this.router.navigate(['login'])
      this.zone.run(() => {
        console.log("Logoutแล้วจ้าาาาาาาาาาาาาา")

        this.router.navigate(['login']);
    });
    }

  // // Sign out 
  // SignOut() {
  //   return this.afAuth.auth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['sign-in']);
  //   })
  // }
   
  
    

  private updateUserData(): void {
    const path =`users/${this.currentUserId}`;
     // Endpoint on firebase  this.router.navigate(['auth',`/editWiki/${data.key}`]);
    const userRef: AngularFireObject<any> = this.db.object(path);
    
  const data = {
      email: this.authState.email,
      name: this.authState.displayName
    }
    console.log("xxxxxxxxxxxx")
  userRef.update(data)
      .catch(error => console.log(error));
  }

  
}
