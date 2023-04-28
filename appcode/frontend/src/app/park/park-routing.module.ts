import { RouterModule, Routes } from "@angular/router";
import { ParkComponent } from "./park.component";
import { SlotsComponent } from "./slots/slots.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/AuthGuard";

const routes: Routes = [
  {
    path: 'parking',
    component: ParkComponent,
    canActivate: [AuthGuard], data: { expectedRole: 'ROLE_PARKING' }
    // children: [
    //   {
    //     path: 'slots',
    //     component: SlotsComponent,
    //   },
    // ]

    // {
    //   path: 'unauthorized',
    //   component: NoAccessComponent
    // },

  },
  {
    path: 'parking/slots',
    component: SlotsComponent,
    canActivate: [AuthGuard], data: { expectedRole: 'ROLE_PARKING' }
    
  }

];
@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkRoutingModule { }