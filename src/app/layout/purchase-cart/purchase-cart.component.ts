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
    
    mensajes = [];
    public alerts: Array<any> = [];
    
    constructor(public dataService: DataService) {
        this.mensajes =  [
            {
                id: 1,
                type: 'success',
                message: `Información de los pedidos.`
            }
        ];
        this.alerts.push(this.mensajes[0]);
    }
    
    
    
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    
    ngOnInit() {
    }
}
