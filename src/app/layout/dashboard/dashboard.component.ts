import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service';
import { HttpCalls } from '../../shared/peticionesHTTP/http.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
   
    constructor(public dataService: DataService, public httpService: HttpCalls ) {
    }

    ngOnInit() { 
        this.dataService.comercial.pedidos.length <= 0 ? this.dataService.mostrarError(0) : null;


        if(localStorage.nombre) {
          this.dataService.cambiarDatosComercial(
              (localStorage.nombre.trim() + " " + localStorage.apellidos.trim()),
              localStorage.provincia,
              localStorage.email
          ); 
      
        }
    }

    
    
    
}
