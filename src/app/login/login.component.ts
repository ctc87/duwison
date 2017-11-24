import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { DataService } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public user;
    public errorMessage;
    public prueba;
    public identity;
    public token;
    
    constructor(public router: Router, private loginService:LoginService, public dataService: DataService) {}    

    ngOnInit() {    
        
        this.user={
            "email":"",
            "password":"",
            "gethash":"false"
            }; 
            localStorage.clear();           
    }    

    onLoggedin() {
       this.loginService.signup(this.user).
        subscribe(response=>{            
            let identity = response;
            this.identity = identity;            

            if (this.identity.status =="error")
            {
                alert("Usuario y/o contraseña incorrecta");
                console.log("Error en la comunicación/logueo servidor.");         
            }
            else
            {
                if(this.identity.status=="ok")
                {
                    localStorage.setItem('nombre', identity.nombre); 
                    localStorage.setItem('apellidos', identity.apellidos);
                    localStorage.setItem('provincia', identity.codalm);                    
                    
                    this.user.gethash="true";
                    this.loginService.signup(this.user).subscribe(
                    response=>{
                            let token = response;
                            this.token=token;
                            
                                if (this.token.length <=0)
                                {
                                    alert("Error");
                                    console.log("Error en la comunicación servidor");         
                                }
                                else
                                {           
                                    localStorage.setItem('isLoggedin', 'true');  
                                    this.dataService.cambiarDatosComercial()
                                    this.router.navigate(['/dashboard']);
                                }

                    }, error=>{
                        this.errorMessage = <any>error;
                            if(this.errorMessage!=null)
                            {
                            console.log("Error desde componente "+this.errorMessage);
                            }                  
                        })
                } 
                
            }

            },
    error=>{
            this.errorMessage = <any>error;
                if(this.errorMessage!=null)
                {
                console.log("Error desde componente "+this.errorMessage);
                }                  
            })             
            
    }

}
