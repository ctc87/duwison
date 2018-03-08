import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { DataService } from '../shared';
import { HttpCalls } from '../shared';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],    
    animations: [routerTransition()]   
})
export class LoginComponent implements OnInit {

    @BlockUI() public blockUI: NgBlockUI;
    public user;
    public errorMessage;
    public prueba;
    public identity;
    public token;
    public logged = false;
    public prov = false;

    constructor(public httpCall : HttpCalls, public router: Router, private loginService:LoginService, public dataService: DataService) {}    
        
    ngOnInit() 
    {    
        this.user={
                "email":"",
                "password":"",
                "gethash":"false"
            }; 
            localStorage.clear();   
    }   

    onLoggedin() 
    {
        let that=this;         
        this.loginService.onLoggedin(this.user, function ()
                                        {
                                            that.logged=that.loginService.logged;     
                                        }
                                    );// MODIFICADO DAMIAN --LOGIN       
    }

    finishLogin()
    {
        this.loginService.finishLogin();
    }

}
