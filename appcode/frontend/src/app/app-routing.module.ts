import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { AuthGuard } from './auth/AuthGuard';
import { UnauthorizedComponent } from './common-components/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'superadmin',
    component: SuperadminComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ROLE_SUPERADMIN' },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
