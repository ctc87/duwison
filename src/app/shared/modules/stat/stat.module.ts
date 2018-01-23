import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 
        ModalCancelar, 
        ModalCobrosPendientes, 
        ModalAlbaranes, 
        ModalEstadisticas,
        ModalFacturaDetalle
    } from '../../../layout/bs-component/components';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),  
        NgxPaginationModule
    ],
    declarations: [
        StatComponent, 
        ModalCancelar,
        ModalCobrosPendientes,
        ModalAlbaranes,
        ModalEstadisticas,
        ModalFacturaDetalle
    ],
    exports: [StatComponent]
})
export class StatModule { }

