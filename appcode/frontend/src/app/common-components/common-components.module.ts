import { AddOrUpdateSubUserComponent } from '../superadmin/add-or-update-sub-user/add-or-update-sub-user.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    SideNavBarComponent,
    DialogBoxComponent,
    AddOrUpdateSubUserComponent,
    UnauthorizedComponent,
  ],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports: [
    SideNavBarComponent,
    DialogBoxComponent,
    AddOrUpdateSubUserComponent,
  ],
})
export class CommonComponentsModule {}
