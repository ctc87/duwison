import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service';

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
    public alerts: Array<any> = [];
    // public sliders: Array<any> = [];
    public errores = [];
    
    public clients = [];
    public LIM = 10;

    constructor(public dataService: DataService) {

        this.errores =  [{
            id: 1,
            type: 'success',
            message: `Pulsa Nuevo pedidos paa empezar a añadir clientes`
        }, {
            id: 2,
            type: 'danger',
            message: `No se permiten mas de ` + this.LIM + ` clientes.`
        }];
    }

    ngOnInit() { 
        this.clients = this.dataService.clients;
        this.clients.length <= 0 ? this.mostrarError(0) : null;
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    addClient() {
        if(this.alerts[0] && this.alerts[0].id === 1) {
           this.closeAlert(this.alerts[0]);
        }
        let indexx = this.clients.length;
        if(this.clients.length < this.LIM)
            this.clients.push({
                id:indexx, 
                nom:"Cliente"+(++indexx), 
                collapsed : true,
                index:(indexx - 1)
                });
        else
            this.mostrarError(1);
    } 
    
    mostrarError(error : number) {
        if(this.alerts.length <= 0)
            this.alerts.push(this.errores[error]);
    }
    
    cerrar(num) {
       this.clients.forEach(function(elemnt, i) {
                if(i != num)
                    elemnt.collapsed = true;
        });
    }
    
}
