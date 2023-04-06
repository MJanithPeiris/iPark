import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin = true;
  isVerified = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeIsLogging(isLogin : boolean) : void {
    this.isLogin = isLogin;
  }

  sendVerification() : void {

  }

  submit(){
this.isVerified = true;
  }
}
