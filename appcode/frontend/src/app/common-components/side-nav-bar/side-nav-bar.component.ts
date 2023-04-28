import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { AuthService } from 'src/app/auth/AuthService';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/data-model/User';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent implements OnInit {
  @Input() isSuperAdmin: boolean = false;
  @Input() isCompany: boolean = false;
  @Input() isParking: boolean = false;

  name!: string | null;
  email!: string | null;

  @Output() isNavigate = new EventEmitter();

  isParkingSlotVisible: boolean = true;
  isRevenueVisible: boolean = true;

  constructor(
    private router: Router,
    private _authenticateService: AuthenticateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.isSuperAdmin && !this.isCompany && !this.isParking) {
      this.isParkingSlotVisible = false;
      this.isRevenueVisible = false;
    } else if (!this.isSuperAdmin && this.isCompany && !this.isParking) {
      this.isParkingSlotVisible = false;
      this.isRevenueVisible = true;
    } else if (!this.isSuperAdmin && !this.isCompany && this.isParking) {
      this.isParkingSlotVisible = true;
      this.isRevenueVisible = false;
    }

    if (sessionStorage.getItem('email') != null) {
      this.email = sessionStorage.getItem('email');
    }
    if (sessionStorage.getItem('name') != null) {
      this.name = sessionStorage.getItem('name');
    }
  }

  navigate(s: string): void {
    const userId = sessionStorage.getItem('userId');
    if (this.isParking && s == 'slot') {
      this.router.navigate(['parking/', 'slots']);
      this.isNavigate.emit(false);
    } else if (this.isCompany && s == 'revenue') {
      this.router.navigate(['company/', 'revenue']);
      this.isNavigate.emit(false);
    }
    console.log(s);
    console.log(this.isCompany);
  }

  signout(): void {
    this._authenticateService.signOut().subscribe({
      next: (res: ResponseModel) => {
        console.log(res);
        if (res.response) {
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userRole');
          sessionStorage.removeItem('userId');
          this.authService.logout();
          this.router.navigate(['login']);
          // this.notifyService.showSuccess(res.message, '');
        } else {
          // this.notifyService.showError(res.message, '');
        }
      },
      error: (error) => {
        console.log(error);
        // this.notifyService.showError(error, '');
      },
    });
  }
}
