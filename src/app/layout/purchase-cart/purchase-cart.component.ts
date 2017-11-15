import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service';
import { HttpCalls } from '../../shared/peticionesHTTP/http.service';


@Component({
    selector: 'app-purchase-cart',
    templateUrl: './purchase-cart.component.html',
    styleUrls: ['./purchase-cart.component.scss'],
    animations: [routerTransition()]
})


export class CartComponent implements OnInit {
 
    constructor(public dataService: DataService) {
    }

    ngOnInit() {
    }
}
