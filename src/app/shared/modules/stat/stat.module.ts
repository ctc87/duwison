import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCancelar, ModalCobrosPendientes, ModalAlbaranes } from '../../../layout/bs-component/components';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot() 
    ],
    declarations: [
        StatComponent, 
        ModalCancelar,
        ModalCobrosPendientes,
        ModalAlbaranes
    ],
    exports: [StatComponent]
})
export class StatModule { }

