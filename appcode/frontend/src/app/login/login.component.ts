import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { Auth } from '../data-model/Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin = true;
  isVerified = false;

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authenticateService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1)]],
      password: [, [Validators.required, Validators.minLength(1)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let authRequest = new Auth();
      authRequest.email = this.loginForm.value.email;
      authRequest.password = this.loginForm.value.password;

      this._authenticateService.signIn(authRequest).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('email', res.email);
          localStorage.setItem('name', res.name);
          localStorage.setItem('token', res.accessToken);
          if (res.response) {
            if (res.userRole[0] === 'ROLE_SUPERADMIN')
              this.router.navigate(['superadmin']);
            else if (res.userRole[0] === 'ROLE_COMPANY')
              this.router.navigate(['company']);
            else if (res.userRole[0] === 'ROLE_PARKING')
              this.router.navigate(['parking']);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  changeIsLogging(isLogin: boolean): void {
    this.isLogin = isLogin;
  }

  sendVerification(): void {}

  submit() {
    this.isVerified = true;
  }
}
