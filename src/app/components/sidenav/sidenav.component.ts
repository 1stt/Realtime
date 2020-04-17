import { Component, OnInit } from '@angular/core';
import { TestHComponent } from '../test-h/test-h.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  items: any[];

  constructor(private testhComponent:TestHComponent) { }

  ngOnInit(): void {
      // Use snapshotChanges().pipe(map()) to store the key
      this.testhComponent.getFileUploads(6).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(items => {
        this.items = items;
      });
  }

}
