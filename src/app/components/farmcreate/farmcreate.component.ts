import { Component, OnInit } from '@angular/core';
import { Farm } from 'src/app/models/farm';
import { FarmService } from 'src/app/services/farm.service';
import { getProvince } from 'src/data/Province';
import { getDistricts } from 'src/data/Districts';
import { getSubDistricts } from 'src/data/SubDistricts';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-farmcreate',
  templateUrl: './farmcreate.component.html',
  styleUrls: ['./farmcreate.component.css']
})
export class FarmcreateComponent implements OnInit {

 
  // farm:Farm=new this.farm();
 
  farm:Farm=new Farm();
  submitted = false;
  
  pro = getProvince();
  dis = getDistricts();
  sub = getSubDistricts();
  // a = findDistricts(1)
  disShow = this.dis
  subDisShow = this.sub

  // bookForm: FormGroup;


  constructor(private farmService: FarmService,
    private router: Router) { }

  ngOnInit() {
  }

  //  /* Reactive book form */
  //  submitBookForm() {
  //   this.bookForm = this.fb.group({
  //     book_name: ['', [Validators.required]],
  //     isbn_10: ['', [Validators.required]],
  //     author_name: ['', [Validators.required]],
  //     publication_date: ['', [Validators.required]],
  //     binding_type: ['', [Validators.required]],
  //     in_stock: ['Yes'],
  //     languages: [this.languageArray]
  //   })
  // }
  newFarm(): void {
    this.submitted = false;
    this.farm = new Farm();
  }

  saveFarm() {
    this.farmService.createCustomer(this.farm);
    this.farm = new Farm();
  }

  onSubmit() {
    this.submitted = true;
    this.saveFarm();
    this.router.navigate(['/farmlist']);


  }
  
  findDistricts(event) {
    let findDis = this.dis
    const result =  findDis.filter( (provinceName) => {
      return provinceName.PROVINCE_ID == event.target.value
    })
    console.log(result)
    this.disShow = result
  }

  findSubDistricts(event) {
    let findSubDis = this.sub
    const result =  findSubDis.filter( (disName) => {
      return disName.DISTRICT_ID == event.target.value
    })
    console.log(result)
    this.subDisShow = result
  }
  
}
