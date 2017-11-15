import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        NgbModule.forRoot(),
        NgbAlertModule.forRoot(),
        PageHeaderModule,
        FormsModule
    ],
    declarations: [
        ProductsComponent
    ]
})
export class ProductsModule { }
