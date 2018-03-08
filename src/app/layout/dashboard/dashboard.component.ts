import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service';
import { HttpCalls } from '../../shared/peticionesHTTP/http.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { AuthGuard } from '../../shared';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html?v=1.0',
    styleUrls: ['./dashboard.component.css'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    constructor(public dataService: DataService, public httpService: HttpCalls, public router: Router, public authGuard: AuthGuard, public loginService:LoginService  ) {
    }
    ngOnInit() {    
        this.authGuard.checkLogout();
        if (localStorage.getItem('isLoggedin'))
        {            
            this.loginService.refreshToken();            
        } 
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
