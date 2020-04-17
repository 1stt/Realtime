import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Book } from '../models/testDate';

@Injectable({
  providedIn: 'root'
})
export class TestdateService {


  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { 

  }

  /* Create book */
  AddBook(book: Book) {
    this.booksRef.push({
      book_name: book.book_name,
    
      author_name: book.author_name,
      publication_date: book.publication_date,
      proV:book.proV,
    disV:book.disV,
    subV:book.subV
      // binding_type: book.binding_type,
     
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get book */
  GetBook(id: string) {
    this.bookRef = this.db.object('list/' + id);
    return this.bookRef;
  }  

  /* Get book list */
  GetBookList() {
    this.booksRef = this.db.list('list');
    return this.booksRef;
  }

  /* Update book */
  UpdateBook(id, book: Book) {
    this.bookRef.update({
      book_name: book.book_name,
    
      author_name: book.author_name,
      publication_date: book.publication_date,
      proV:book.proV,
      disV:book.disV,
      subV:book.subV
      // binding_type: book.binding_type,
     
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete book */
  DeleteBook(id: string) {
    this.bookRef = this.db.object('list/' + id);
    this.bookRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}
