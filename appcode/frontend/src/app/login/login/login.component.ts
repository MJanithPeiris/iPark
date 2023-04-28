import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { Auth } from '../../data-model/Auth';
import { Router } from '@angular/router';
import { ResponseModel } from '../../data-model/User';
import { AuthService } from 'src/app/auth/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isError = false;

  constructor(
    private fb: FormBuilder,
    private _authenticateService: AuthenticateService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  changeIsLogging(): void {
    this.router.navigate(['changepassword']);
  }

  login() {
    if (this.loginForm.valid) {
      let authRequest = new Auth();
      authRequest.email = this.loginForm.value.email;
      authRequest.password = this.loginForm.value.password;

      this._authenticateService.signIn(authRequest).subscribe({
        next: (res: ResponseModel) => {
          if (res.response) {
            this.authService.login(res.model);
            sessionStorage.setItem('email', res.model.email);
            sessionStorage.setItem('name', res.model.name);
            sessionStorage.setItem('token', res.model.accessToken);
            sessionStorage.setItem('userRole', res.model.userRole[0]);
            sessionStorage.setItem('userId', res.model.userId);

            if (res.model.userRole[0] === 'ROLE_SUPERADMIN')
              this.router.navigate(['superadmin']);
            else if (res.model.userRole[0] === 'ROLE_COMPANY')
              this.router.navigate(['company']);
            else if (res.model.userRole[0] === 'ROLE_PARKING')
              this.router.navigate(['parking']);
          }else{
            this.isError = true;
          }
        },
        error: (error) => {
          console.log('ree' +error);
          this.isError = true;
        },
      });
    }
  }

  // this._authenticateService.signIn(authRequest).subscribe({
  //   next: (res: ResponseModel) => {
  //     console.log(res);
  //     localStorage.setItem('email', res.email);
  //     localStorage.setItem('name', res.name);
  //     localStorage.setItem('token', res.accessToken);
  //     if (res.response) {
  //       if (res.userRole[0] === 'ROLE_SUPERADMIN')
  //         this.router.navigate(['superadmin']);
  //       else if (res.userRole[0] === 'ROLE_COMPANY')
  //         this.router.navigate(['company']);
  //       else if (res.userRole[0] === 'ROLE_PARKING')
  //         this.router.navigate(['parking']);
  //     }
  //   },
  //   error: () => {},
  // });
}
