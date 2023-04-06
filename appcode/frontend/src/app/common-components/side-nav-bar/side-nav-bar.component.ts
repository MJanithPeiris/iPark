import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@popperjs/core';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  @Input() isSuperAdmin: boolean = false;
  @Input() isCompany : boolean = false;
  @Input() isParking : boolean = false;

  isParkingSlotVisible : boolean = true;
  isRevenueVisible : boolean = true;

  constructor() { }

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
      
  }
  test(s : string){
    console.log(s);
  }
}
