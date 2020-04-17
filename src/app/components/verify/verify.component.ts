import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TestdateService } from 'src/app/services/testdate.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { getProvince } from 'src/data/Province';
import { getDistricts } from 'src/data/Districts';
import { getSubDistricts } from 'src/data/SubDistricts';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  bookForm: FormGroup;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  pro = getProvince();
  dis = getDistricts();
  sub = getSubDistricts();
  // a = findDistricts(1)
  disShow = this.dis
  subDisShow = this.sub

  globalProvince: any
  globalDistrict: any
  globalSubDistrict: any



  constructor( public fb: FormBuilder,
    private bookApi: TestdateService,
    private router: Router,
    private actRoute: ActivatedRoute,) { }

  ngOnInit(){
    this.bookApi.GetBookList();
    this.submitBookForm();
  }

  findDistricts(event) {
    let findDis = this.dis
    const result =  findDis.filter( (provinceName) => {
      return provinceName.PROVINCE_ID == event.target.value
    })
    console.log(result)
    this.disShow = result
    this.globalProvince =  this.pro.filter( (provinceName) => {
      return provinceName.PROVINCE_ID == event.target.value
    })
    console.log('global province' , this.globalProvince)
  }

  findSubDistricts(event) {
    let findSubDis = this.sub
    const result =  findSubDis.filter( (disName) => {
      return disName.DISTRICT_ID == event.target.value
    })
    console.log(result)
    this.subDisShow = result
    this.globalDistrict =  this.dis.filter( (disName) => {
      return disName.DISTRICT_ID == event.target.value
    })
    console.log('global district' , this.globalDistrict)
  }

  changeGlobalSubdistrict(event) {
    this.globalSubDistrict = event.target.value
    console.log('global subdistrict ', this.globalSubDistrict)
  }

  /* Reactive book form */
  submitBookForm() {
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      // isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      proV: ['', [Validators.required]],
      disV: ['', [Validators.required]],
      subV: ['', [Validators.required]]
      // binding_type: ['', [Validators.required]],
      // in_stock: ['Yes'],
      // languages: [this.languageArray]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value)
    console.log(convertDate)
    
    let dateNew = convertDate.toString().split('-')
    let day = parseInt(dateNew[2]) + 1
    const dateStr = `${dateNew[0]}-${dateNew[1]}-${day}`
    console.log('conver date ' , dateStr)
    this.bookForm.get('publication_date').setValue(convertDate)
  }

  /* Reset form */
  resetForm() {
    // this.languageArray = [];
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.controls[key].setErrors(null)
    });
  }

  /* Submit book */
  submitBook() {
    // var id = this.actRoute.snapshot.paramMap.get('id');

    if (this.bookForm.valid){
      this.bookApi.AddBook(this.bookForm.value);
      // this.router.navigate(['/memberlist']);    
      this.resetForm();
    }
    console.log(5555555555)
  }
  // goToHome = () => {
  //   this.router.navigate(['/memberlist']);
  // }

}
