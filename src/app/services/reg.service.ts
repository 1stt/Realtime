import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  detailList:AngularFireList<any>;


  constructor( private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) { 
      
    this.detailList = db.list('DetailUser');

  }

   //Detailuser//
   getDetailuserList(): Observable<any[]> {
    return this.detailList.snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    });
  }

  getDetailUser(id): Observable<any> {
    return this.db.object('DetailUser/' + id).snapshotChanges().map(res => {
      return res.payload.val();
    });
  }

  addDetailUser(data) {
    
    return this.detailList.push(data);
  }

   removeDetailUser(id): void {
    this.detailList.remove(id);
  }

  editDetailUser(id, data) {
    return this.detailList.update(id, data);
  }

}
