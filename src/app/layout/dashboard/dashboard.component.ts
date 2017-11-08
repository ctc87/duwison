import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service';
import { HttpCalls } from '../../shared/peticionesHTTP/http.service';

// HAY UN CONFLICTO CON EXPANDIR MODALES CUANDO SE HAN BORRADO SE PIERDEN LSO INDICES. MODIFICAR LA FUNCION
// DE ABRIR Y CERRAR MODALES PARA UTILIZAR EL ID DEL CLIENTE (SE NESITA YA UN OBJETO CON LSO ID DE LOS CLIENTES
// Y NO AUTOGENERARLOS)


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
   
    // public sliders: Array<any> = [];
    // public errores = [];
    
    

    constructor(public dataService: DataService, public httpService: HttpCalls ) {

        // this.errores =  [{
        //     id: 1,
        //     type: 'success',
        //     message: `Pulsa Nuevo pedidos paa empezar a añadir clientes`
        // }, {
        //     id: 2,
        //     type: 'danger',
        //     message: `No se permiten mas de ` + this.LIM + ` clientes.`
        // }];
    }

    ngOnInit() { 
        console.log(this.dataService.alerts)
        this.dataService.clients.length <= 0 ? this.dataService.mostrarError(0) : null;
    }

    
    
    
}
