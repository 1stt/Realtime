import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Member } from '../models/member';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  // private dbPath = '/member';
  // memberList:AngularFireList<Member>;

  memberList: AngularFireList<any>;




  constructor(private db: AngularFireDatabase,
    ) {
    this.memberList = db.list('member');


   }

   getWikiList(): Observable<any[]> {
    return this.memberList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    });
  }

  getWiki(id): Observable<any> {
    return this.db.object('member/' + id).snapshotChanges().map(res => {
      return res.payload.val();
    });
  }

  removeWiki(id): void {
    this.memberList.remove(id);
  }

  addWiki(data) {
    return this.memberList.push(data);
  }

  editWiki(id, data) {
    return this.memberList.update(id, data);
  }

  //  createCustomer(member: Member): void {
  //   this.memberList.push(member);
  // }

  // updateCustomer(key: string, value: any): Promise<void> {
  //   return this.memberList.update(key, value);
  // }

  // deleteCustomer(key: string): Promise<void> {
  //   return this.memberList.remove(key);
  // }

  // getCustomersList(): AngularFireList<Member> {
  //   return this.memberList;
  // }

  // deleteAll(): Promise<void> {
  //   return this.memberList.remove();
  // }
  
}
