import { Component } from '@angular/core';
import { DataService } from '../../services/data.service'
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    
    constructor(public dataService: DataService){
        console.log("DATASREVICE SIDE", this.dataService)    
        
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

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

}
