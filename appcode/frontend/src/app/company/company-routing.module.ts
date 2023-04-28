import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyRevenueComponent } from './company-revenue/company-revenue.component';
import { AuthGuard } from '../auth/AuthGuard';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMPANY' }
  },
  {
    path: 'company/revenue',
    component: CompanyRevenueComponent,
    canActivate: [AuthGuard], data: { expectedRole: 'ROLE_COMPANY' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
