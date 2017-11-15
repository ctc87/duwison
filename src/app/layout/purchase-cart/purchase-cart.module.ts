import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CartRoutingModule } from './purchase-cart-routing.module';
import { CartComponent } from './purchase-cart.component';
import { PageHeaderModule } from '../../shared';
import { TabsComponent } from '../bs-component/components';


@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        CartRoutingModule,
        PageHeaderModule,
    ],
    declarations: [
        CartComponent,  
        TabsComponent
    ]
})
export class CartModule { }
