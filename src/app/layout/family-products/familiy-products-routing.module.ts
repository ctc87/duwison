import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyProductsComponent } from './family-products.component';

const routes: Routes = [
    { path: '', component: FamilyProductsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FamiliyRoutingModule { }
