import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

import {
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { ProductsCardsRoutingModule } from './products-cards-routing.module';
import { NavModule } from '../../shared/modules/nav/nav.module';

import { ProductsCardsComponent } from './products-cards.component';
import { PageHeaderModule } from './../../shared';


@NgModule({
    imports: [
        CommonModule,
        ProductsCardsRoutingModule,
        NgbModule.forRoot(),
        NgbAlertModule.forRoot(),
        PageHeaderModule,
        FormsModule,
        NavModule, 
        NgxPaginationModule
    ],
    declarations: [
        ProductsCardsComponent
    ]
})
export class ProductsCardsModule { }
