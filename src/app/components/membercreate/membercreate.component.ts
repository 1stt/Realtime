import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-membercreate',
  templateUrl: './membercreate.component.html',
  styleUrls: ['./membercreate.component.css']
})
export class MembercreateComponent implements OnInit {
  
  // member:Member=new Member();
  // submitted = false;

  member: any= {};
  title: string;
  id: string;

  constructor(
  
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.title = 'Add Wiki';
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getWikiByKey(this.id);
      this.title = 'Edit wiki';
  }
}

  addWiki(data) {
    
    if (this.id) {
      this.memberService.editWiki(this.id, data.value).then(this.goToHome);
    } else {
      this.memberService.addWiki(data.value).then(this.goToHome);
    }
  }

  getWikiByKey(id) {
    this.memberService.getWiki(id).subscribe((data) => {
      this.member = data;
    });
  }

  goToHome = () => {
    this.router.navigate(['/memberlist']);
  }
  // newCustomer(): void {
  //   this.submitted = false;
  //   this.member = new Member();
  // }

  // save() {
  //   this.memberService.createCustomer(this.member);
  //   this.member = new Member();
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   this.save();
  //   this.router.navigate(['/memberlist']);

  // }

  

}
