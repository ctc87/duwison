import { Component, Input } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { routerTransition } from '../../router.animations';
import { HttpCalls } from '../../shared';
import { AuthGuard } from '../../shared';
import { LoginService } from '../../shared/services/login.service';


@Component({
  selector: 'app-family-products',
  templateUrl: './family-products.component.html',
  styleUrls: ['./family-products.component.css'],
    animations: [routerTransition()]
})
export class FamilyProductsComponent {
 familiArray = [];
 mensajes = [];
 public alerts: Array<any> = [];
 
 constructor(public dataService: DataService, public httpService: HttpCalls,public authGuard: AuthGuard, public loginService:LoginService) {
    this.familiArray = httpService.objetosJSON["familias"];
    
    

   this.mensajes =  [
            {
                id: 1,
                type: 'success',
                message: `Selecciona la familia que desees.`
            }
        ];
    this.alerts.push(this.mensajes[0]);
    } 

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    ngOnInit() {

        this.authGuard.checkLogout();
        if (localStorage.getItem('isLoggedin'))
        {            
            this.loginService.refreshToken();            
        } 
    }
}
