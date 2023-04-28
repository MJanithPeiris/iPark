import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { CompanyComponent } from './company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CommonComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class CompanyModule { }
