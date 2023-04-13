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



@NgModule({
  declarations: [
    ParkComponent,
    SlotsComponent,
    ManageVehicleComponent,
  ],
  imports: [
    ParkRoutingModule,
    CommonComponentsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class ParkModule { }
