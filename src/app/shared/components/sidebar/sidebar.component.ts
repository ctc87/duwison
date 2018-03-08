import { Component } from '@angular/core';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    
    constructor(public dataService: DataService,public router:Router){
        //console.log("DATASREVICE SIDE", this.dataService)    
        
    }
    
    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    inicio()
    {    
        this.router.navigate(['/dashboard'], {skipLocationChange: true});
    }

    pedidos()
    {    
        this.router.navigate(['/cart'], {skipLocationChange: true});
    }    

    onLoggedout() 
    {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login'], {skipLocationChange: true});
    }

}
