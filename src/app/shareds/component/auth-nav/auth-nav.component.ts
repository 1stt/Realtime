import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestauthService } from 'src/app/services/testauth.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit {

  constructor(
    // private auths:AuthService,
    // private router:Router
    ) { }
  ngOnInit(): void {
  }

  
}
