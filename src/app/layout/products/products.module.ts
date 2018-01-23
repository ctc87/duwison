import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

import {
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';
import { NavModule } from '../../shared/modules/nav/nav.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        NgbModule.forRoot(),
        NgbAlertModule.forRoot(),
        PageHeaderModule,
        FormsModule,
        NavModule, 
        NgxPaginationModule
    ],
    declarations: [
        ProductsComponent,
    ]
})
export class ProductsModule { }
