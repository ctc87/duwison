import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]//,
  //  providers: [LoginService]
})
export class LoginComponent implements OnInit {

    public user;
    public errorMessage;
    public prueba;
    public identity;
    public token;
    
    constructor(public router: Router, private loginService:LoginService) {}    

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
                    localStorage.setItem('email', identity.email); 
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
                                    
                                        this.router.navigate(['/dashboard']);
                                        console.log(this.identity);       
                                        console.log(this.token);         
                                        
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
