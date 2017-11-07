import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../layout/bs-component/components';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [
        StatComponent, 
        ModalComponent
    ],
    exports: [StatComponent]
})
export class StatModule { }

