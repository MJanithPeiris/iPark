import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/data-model/Auth';
import { ResponseModel } from 'src/app/data-model/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isVerified = false;
  forgetPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  
  constructor(private fb: FormBuilder,
    private _authenticateService: AuthenticateService,
    private router: Router) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1)]],
      securityCode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  changeIsLogging(): void {
    this.router.navigate(['login']);
  }

  sendVerification(): void {
    if (this.forgetPasswordForm.value.email !== '') {
      let authRequest = new Auth();
      authRequest.email = this.forgetPasswordForm.value.email;
      this._authenticateService.forgetPassword(authRequest).subscribe({
        next: (res: ResponseModel) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      })
    }
   
  }

  next() {
    if (this.forgetPasswordForm.valid) {
      let authRequest = new Auth();
      authRequest.email = this.forgetPasswordForm.value.email;
      authRequest.securityCode = this.forgetPasswordForm.value.securityCode;

      this._authenticateService.validateSecurityCode(authRequest).subscribe({
        next: (res: ResponseModel) => {
          if(res.response){
            this.isVerified = res.response
          }else{

          }
        },
        error: (error) => {
          console.log(error);
        },
      })
    }
  }

  reset(){
    if(this.resetPasswordForm.valid && this.resetPasswordForm.value.newPassword === this.resetPasswordForm.value.confirmPassword){
      let authRequest = new Auth();
      authRequest.email = this.forgetPasswordForm.value.email;
      authRequest.password = this.resetPasswordForm.value.newPassword;

      console.log(authRequest);

      this._authenticateService.resetPassword(authRequest).subscribe({
        next: (res: ResponseModel) => {
          console.log(res);
          
          if(res.response){
            this.router.navigate(['login']);
          }else{

          }
        },
        error: (error) => {
          console.log(error);
        },
      })
      
    }
  }
}
