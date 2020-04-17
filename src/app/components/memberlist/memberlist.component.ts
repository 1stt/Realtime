import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {

    members:any;

  // @Input() member:Member;
  
  constructor(private router: Router, private memberService: MemberService) { }

  ngOnInit(){
    this.memberService.getWikiList().subscribe(items => {
      this.members = items;
    });

  }

  delWiki(data) {
    this.memberService.removeWiki(data.key);
  }

  editWiki(data) {
    this.router.navigate([`/editWiki/${data.key}`]);
  }
//  getCustomersList() {
//     this.memberService.getCustomersList().snapshotChanges().pipe(
//       map(changes =>
//         changes.map(c =>
//           ({ key: c.payload.key, ...c.payload.val() })
//         )
//       )
//     ).subscribe(members => {
//       this.members = members;
//     });
//   }

//   deleteCustomer() {
//     this.memberService
//       .deleteCustomer(this.members.key)
//       .catch(err => console.log(err));
//   }
  

}
