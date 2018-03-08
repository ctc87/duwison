import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { SearchComponent } from '../shared/modules/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
//import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        RouterModule,
        NgbModule.forRoot(),
        FormsModule
        //NgxSelectModule 

    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        SearchComponent, 
    ]
})
export class LayoutModule { }