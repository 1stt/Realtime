import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { map, tap, finalize } from 'rxjs/operators';
//import { Upload } from 'src/app/models/upload';
// import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
// import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';


import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 
  items:Observable<any[]>;
  upload:Upload = new Upload();
  uploadPercentage$: Observable<number>;
  isUpload:boolean  = false;



  
  constructor(
    private storage: AngularFireStorage,private db: AngularFireDatabase
  
    ) {
      
      this.items = db.list('/uploads', ref=> ref.orderByChild('time')).snapshotChanges().map(result=>{
        return result.reverse();
      });
    
    }

  ngOnInit() {

    
  }

  startUpload(event){
    const file = event.item(0)
    const path = `uploads/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);
    const task = this.storage.upload(path, file);
  
    this.uploadPercentage$ = task.percentageChanges();
    
    task.snapshotChanges().pipe(
      finalize(() => {
        
        ref.getDownloadURL().toPromise().then(url => {
          this.upload.imageUrl = url.toString();
               this.upload.imageName = path;
                         this.isUpload = true;
  
        })
      })
    ).subscribe();
  
  
  }
  onClickSubmit(){
    //สร้างโน๊ตใหม่ชื่อ customers ในกรณีที่ยังไม่มีสร้างใน db
    let itemref = this.db.list('uploads')
    itemref.push(this.upload); //คือการโยนค่า student ใส่ลงไปทั้งก้อน

    // this.isUpload =  false;
    // this.snapshot = null;
    // this.percentage = null;
    // this.upload.name= "";
    // this.upload.lastname= "";
    // this.upload.username= "";
    // this.upload.imageName= "";
    // this.upload.imageUrl= "";
    // this.upload.phone= "";

    console.log(55555555555)

    }

    onClickDelete(item){
    console.log("key:" + JSON.stringify(item));
    let itemRef = this.db.list('uploads');
    itemRef.remove(item.key);

    var deserRef = this.storage.ref(item.payload.val().imageName);
    deserRef.delete().subscribe(()=>{
      console.log("delete");
    })
    }

}
class Upload{
  name = "";
 
  
  imageName = "";
  imageUrl = "";
 
  timestamp = Date.now();
  date="";

  }
