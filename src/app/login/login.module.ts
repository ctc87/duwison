import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSelectProvincia }  from '../layout/bs-component/components'
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({ 
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule, 
        NgbModule.forRoot(),
    ],
    declarations: [
        LoginComponent, 
        ModalSelectProvincia
        ]
})
export class LoginModule {
}
