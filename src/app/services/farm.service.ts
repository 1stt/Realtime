import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import {  Farm } from '../models/farm';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private dbPath = '/farm';
  farmList:AngularFireList<Farm>;


  // booksRef: AngularFireList<any>;
  // bookRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    // this.farmList = db.list(this.dbPath);


   }
   
   createCustomer(farm: Farm): void {
    this.farmList.push(farm);
  }

  updateCustomer(key: string, farm: Farm): Promise<void> {
    return this.farmList.update(key, farm);
  }

  editWiki(key, farm: Farm) {
    return this.farmList.update(key, farm);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.farmList.remove(key);
  }

  

  getCustomersList(): AngularFireList<Farm> {
    return this.farmList;
  }

  deleteAll(): Promise<void> {
    return this.farmList.remove();
  }


  //   /* Create book */
  // AddBook(book: Book) {
  //   this.booksRef.push({
  //     farmOwner: book.farmOwner,
  //     farmname: book.farmname,
  //     dateGrowth: book.dateGrowth,
      
  //     sizeF:book.sizeF,
  //     size: book.size,
      
  //   })
  //   .catch(error => {
  //     this.errorMgmt(error);
  //   })
  // }

  // /* Get book */
  // GetBook(id: string) {
  //   this.bookRef = this.db.object('books-list/' + id);
  //   return this.bookRef;
  // }  

  // /* Get book list */
  // GetBookList() {
  //   this.booksRef = this.db.list('books-list');
  //   return this.booksRef;
  // }

  // /* Update book */
  // UpdateBook(id, book: Book) {
  //   this.bookRef.update({
  //     farmOwner: book.farmOwner,
  //     farmname: book.farmname,
  //     dateGrowth: book.dateGrowth,
      
  //     sizeF:book.sizeF,
  //     size: book.size,
  //   })
  //   .catch(error => {
  //     this.errorMgmt(error);
  //   })
  // }

  // /* Delete book */
  // DeleteBook(id: string) {
  //   this.bookRef = this.db.object('books-list/' + id);
  //   this.bookRef.remove()
  //   .catch(error => {
  //     this.errorMgmt(error);
  //   })
  // }

  // // Error management
  // private errorMgmt(error) {
  //   console.log(error)
  // }
   
  


}

