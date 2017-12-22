import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsCardsComponent } from './products-cards.component';

const routes: Routes = [
    { path: '', component: ProductsCardsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsCardsRoutingModule { }
