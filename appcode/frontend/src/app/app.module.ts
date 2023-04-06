import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { CompanyComponent } from './company/company.component';
import { SideNavBarComponent } from './common-components/side-nav-bar/side-nav-bar.component';
import { ParkModule } from './park/park.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOrUpdateUserComponent } from './superadmin/add-or-update-user/add-or-update-user.component';
import { AddOrUpdateSubUserComponent } from './superadmin/add-or-update-sub-user/add-or-update-sub-user.component';
import { DialogBoxComponent } from './common-components/dialog-box/dialog-box.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperadminComponent,
    CompanyComponent,
    SideNavBarComponent,
    AddOrUpdateUserComponent,
    AddOrUpdateSubUserComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ParkModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      autoDismiss: true,
      maxOpened: 1,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
      progressBar: true,
      tapToDismiss: true

    }),
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
