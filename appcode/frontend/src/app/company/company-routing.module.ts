import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyRevenueComponent } from './company-revenue/company-revenue.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'company/revenue',
    component: CompanyRevenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
