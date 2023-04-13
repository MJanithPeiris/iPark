import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddOrUpdateSubUserComponent } from '../superadmin/add-or-update-sub-user/add-or-update-sub-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SideNavBarComponent,
    DialogBoxComponent,
    AddOrUpdateSubUserComponent
  ],
  imports: [
    CommonModule,
    NgbModule, FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SideNavBarComponent,
    DialogBoxComponent,
    AddOrUpdateSubUserComponent
  ]
})
export class CommonComponentsModule { }
