import { Component, OnInit, Input } from '@angular/core';
import { FarmService } from 'src/app/services/farm.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Farm } from 'src/app/models/farm';


@Component({
  selector: 'app-farmlist',
  templateUrl: './farmlist.component.html',
  styleUrls: ['./farmlist.component.css']
})
export class FarmlistComponent implements OnInit {

  farms:any;

  @Input() farm:Farm;
  constructor(private farmService: FarmService,
    public router: Router) { }

  ngOnInit(){
    this.getCustomersList();

  }

  getCustomersList() {
    this.farmService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(farms => {
      this.farms = farms;
    });
  }

  deleteCustomer() {
    this.farmService
      .deleteCustomer(this.farm.key)
      .catch(err => console.log(err));
  }

  editFarm() {
    this.router.navigate([`/editFarm/${this.farms.key}`]);
  }

  // updateActive() {
  //   this.farmService
  //     .updateCustomer(this.farms.key,this.farms)
  //     .catch(err => console.log(err));
  //     this.router.navigate([`/editFarm/${this.farms.key}`]);

  // }


}
