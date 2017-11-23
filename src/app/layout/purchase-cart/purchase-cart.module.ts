import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { CartRoutingModule } from './purchase-cart-routing.module';
import { CartComponent } from './purchase-cart.component';
import { PageHeaderModule } from '../../shared';
import { TabsComponent } from '../bs-component/components';
import { KeysPipe } from '../../shared/pipes/keys.pipe'

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        CartRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        CartComponent,  
        TabsComponent, 
        KeysPipe
    ]
})
export class CartModule { 
}
