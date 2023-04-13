import { RouterModule, Routes } from "@angular/router";
import { ParkComponent } from "./park.component";
import { SlotsComponent } from "./slots/slots.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'parking',
    component: ParkComponent,
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
    
  }

];
@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkRoutingModule { }