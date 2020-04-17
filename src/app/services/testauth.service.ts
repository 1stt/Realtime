import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TestauthService {
  user: Observable<firebase.User>;
  authState: any = null;
  userRef: AngularFireObject<any>;

  constructor(   public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private db: AngularFireDatabase,
    private ngZone:NgZone) {

      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth
        });
   }
   
    get authenticated(): boolean {
      return this.authState !== null;
    }

  get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }

  getCurrentLoggedIn() {
      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          console.log(55555555555)
          // this.router.navigate(['/'])
        }
      });
    }

  signOut(): void {
      this.afAuth.auth.signOut();
      // this.router.navigate(['login'])
      this.ngZone.run(()=>this.navigateTo('login'));
    }

    login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
              this.authState = user
              // this.navigateTo(['/membercreate'])
              this.ngZone.run(()=>this.navigateTo('membercreate'));
              console.log("xxxxxxxxxxxxxxxxxxx")
              // this.alert.notify('เข้าสู่ระบบ','info');
            })
        .catch(err => {
          console.log('Something went wrong:',err.message);
          // this.router.navigate(['reg']);
          this.ngZone.run(()=>this.navigateTo('reg'));
          // this.alert.notify('ไม่มีผู้ใช้นี้ในระบบ','info');
        });
    }

    signup(email: string, password: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
              this.authState = user
              // this.navigateTo(['/membercreate'])
              this.ngZone.run(()=>this.navigateTo('membercreate'));
              console.log("xxxxxxxxxxxxxxxxxxx")
              // this.alert.notify('เข้าสู่ระบบ','info');
            })
        .catch(err => {
          console.log('Something went wrong:',err.message);
          // this.router.navigate(['reg']);
          this.ngZone.run(()=>this.navigateTo('reg'));
          // this.alert.notify('ไม่มีผู้ใช้นี้ในระบบ','info');
        });
      })
      .catch(error => console.log(error));
  }

  //   signup(email: string, password: string) {
  //     this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( (user) => {
  //       this.authState = user
  //     })
  //     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //       .then((user) => {
  //             this.ngZone.run(() => this.navigateTo('membercreate'));
  //             console.log("xxxxxxxxxxxxxxxxxxx")
  //           })
  //       .catch( (err) => {
  //         console.log('Something went wrong:',err.message);
  //         this.ngZone.run(()=>this.navigateTo('reg'));
  //       });

  // }

  navigateTo(url){

    this.router.navigate([url]);

}

  private updateUserData(): void {
    const path =`users/${this.currentUserId}`;
     // Endpoint on firebase  this.router.navigate(['auth',`/editWiki/${data.key}`]);
    const userRef: AngularFireObject<any> = this.db.object(path);

  const data = {
      email: this.authState.email,
      name: this.authState.displayName
    }
  userRef.update(data)
      .catch(error => console.log(error));
  }
}
