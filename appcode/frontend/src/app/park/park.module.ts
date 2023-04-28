import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkComponent } from './park.component';
import { SlotsComponent } from './slots/slots.component';
import { ParkRoutingModule } from './park-routing.module';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageBoxComponent } from './message-box/message-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ParkComponent,
    SlotsComponent,
    ManageVehicleComponent,
    MessageBoxComponent,
  ],
  imports: [
    ParkRoutingModule,
    CommonComponentsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class ParkModule { }
