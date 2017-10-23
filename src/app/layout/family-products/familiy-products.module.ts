import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { FamiliyRoutingModule } from './familiy-products-routing.module';

import { FamilyUnitComponent } from './family-unit/family-unit.component';
import { FamilyProductsComponent } from './family-products.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        FamiliyRoutingModule,
        NgbModule.forRoot(),
        NgbAlertModule.forRoot(),
        PageHeaderModule
    ],
    declarations: [
        FamilyProductsComponent,
        FamilyUnitComponent
    ]
})
export class FamilyProductsModule { }
