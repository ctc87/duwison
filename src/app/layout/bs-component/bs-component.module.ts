import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectizeModule } from 'ng-selectize';
import { SelectModule } from 'ng2-select-compat';
import { BrowserModule } from '@angular/platform-browser';
// relative import
import { BsComponentRoutingModule } from './bs-component-routing.module';
import { TabsModule, ButtonsModule } from 'ngx-bootstrap';
import { BsComponentComponent } from './bs-component.component';
import {
    AlertComponent,
    ButtonsComponent,
    // ModalCancelar,
    // ModalCliente,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    // TabsComponent,
    TooltipComponent,
    TimepickerComponent,
} from './components';
import { PageHeaderModule } from '../../shared';
//import { ModalCliente } from './components/modal-selct-cliente/modal.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule,
        BsComponentRoutingModule,
        NgSelectizeModule,
        SelectModule,
        TabsModule.forRoot(),
        BrowserModule,
ButtonsModule.forRoot(),
    ],
    declarations: [
        BsComponentComponent,
        ButtonsComponent,
        AlertComponent,
        // ModalCancelar,
        // ModalCliente,
        CollapseComponent,
        DatePickerComponent,
        DropdownComponent,
        PaginationComponent,
        PopOverComponent,
        ProgressbarComponent,
        // TabsComponent,
        TooltipComponent,
        TimepickerComponent//,
       // ModalCliente
    ]
})
export class BsComponentModule { }
