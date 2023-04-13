import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin = true;
  isVerified = false;

  loginForm! : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.minLength(1)
      ]],
      password: [ , [
        Validators.required, 
        Validators.minLength(1)
      ]]
    });
  }

  login(){
    if(this.loginForm.valid){
      console.log('login')
      localStorage.setItem('email', this.loginForm.value.email);
    }
    
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
