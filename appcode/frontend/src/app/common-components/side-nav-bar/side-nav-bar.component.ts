import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  @Input() isSuperAdmin: boolean = false;
  @Input() isCompany : boolean = false;
  @Input() isParking : boolean = false;

  name!: string | null;
  email!: string | null;

  @Output() isNavigate = new EventEmitter();

  isParkingSlotVisible : boolean = true;
  isRevenueVisible : boolean = true;

  constructor(private router: Router, private _authenticateService: AuthenticateService,) { }

  ngOnInit(): void {
    if(this.isSuperAdmin && !this.isCompany && !this.isParking){
      this.isParkingSlotVisible = false;
      this.isRevenueVisible = false;
    }
    else if(!this.isSuperAdmin && this.isCompany && !this.isParking){
      this.isParkingSlotVisible = false;
      this.isRevenueVisible = true;
    }
    else if(!this.isSuperAdmin && !this.isCompany && this.isParking){
      this.isParkingSlotVisible = true;
      this.isRevenueVisible = true;
    }

    if(localStorage.getItem('email') != null){
      this.email = localStorage.getItem('email');
    }
    if(localStorage.getItem('name') != null){
      this.name = localStorage.getItem('name');
    }
      
  }

  navigate(s : string): void{
    if(this.isParking && s == 'slot'){
      this.router.navigate(['parking/','slots']);
      this.isNavigate.emit(false);
    }
    else if(this.isCompany && s =='revenue'){
      this.router.navigate(['company/','revenue']);
      this.isNavigate.emit(false);
    }
    console.log(s);
    console.log(this.isCompany);
  }

  signout(): void{
    this._authenticateService.signOut().subscribe(
      (res) => {
        console.log(res);
        if (res.response) {
          localStorage.removeItem('email');
          localStorage.removeItem('name');
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
    
  }
}
