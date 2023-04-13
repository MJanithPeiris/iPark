import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-revenue',
  templateUrl: './company-revenue.component.html',
  styleUrls: ['./company-revenue.component.scss']
})
export class CompanyRevenueComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['company']);
  }

  slotInfo(a: number){
    console.log(a)
  }

}
