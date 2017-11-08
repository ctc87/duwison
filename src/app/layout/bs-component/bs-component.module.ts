import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectizeModule } from 'ng-selectize';
// relative import
import { BsComponentRoutingModule } from './bs-component-routing.module';
import { BsComponentComponent } from './bs-component.component';
import {
    AlertComponent,
    ButtonsComponent,
    ModalCancelar,
    ModalCliente,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    TabsComponent,
    TooltipComponent,
    TimepickerComponent,
} from './components';

import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule,
        BsComponentRoutingModule,
        NgSelectizeModule
    ],
    declarations: [
        BsComponentComponent,
        ButtonsComponent,
        AlertComponent,
        ModalCancelar,
        ModalCliente,
        CollapseComponent,
        DatePickerComponent,
        DropdownComponent,
        PaginationComponent,
        PopOverComponent,
        ProgressbarComponent,
        TabsComponent,
        TooltipComponent,
        TimepickerComponent
    ]
})
export class BsComponentModule { }
