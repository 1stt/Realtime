import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';

import { MembercreateComponent } from './components/membercreate/membercreate.component';
import { MemberlistComponent } from './components/memberlist/memberlist.component';
import { FarmcreateComponent } from './components/farmcreate/farmcreate.component';
import { FarmlistComponent } from './components/farmlist/farmlist.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProcessComponent } from './components/process/process.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';

import { TestHComponent } from './components/test-h/test-h.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';




const routes: Routes = [
  { path: '', component:  RegComponent},
  { path: 'login', component: LoginComponent},
  { path: 'reg', component: RegComponent},
  { path: 'membercreate', component: MembercreateComponent},
  {path: 'editWiki/:id', component: MembercreateComponent},

  { path: 'memberlist', component: MemberlistComponent},
  { path: 'farmcreate', component: FarmcreateComponent },
  // {path: 'editFarm/:key', component: FarmcreateComponent},
  // { path: 'edit-book/:id', component: FarmcreateComponent },

  { path: 'farmlist', component: FarmlistComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'process', component: ProcessComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'setting', component: SettingComponent },
 
  { path: 'testH', component: TestHComponent },


  { path: 'sign-in', component: SigninComponent},
  { path: 'register-user', component: SignupComponent },
  { path: 'ver', component: VerifyComponent },
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
