import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig ,JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true; 
        }
    
        this.router.navigate(['/login'], {skipLocationChange: true});
        return false;
    }

    checkLogout()
    {    
        //console.log("Entro en checkLogout - Auth.guard");   
        let var_token = localStorage.getItem('token'); 
        let expiration = this.jwtHelper.isTokenExpired(var_token);
        //console.log(expiration);
        console.log('vigente fecha expiración '+this.jwtHelper.getTokenExpirationDate(var_token));
        if (expiration)
        {            
        alert("Sesión expirada");
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login'], {skipLocationChange: true});
        }        
        var vari = localStorage.getItem('isLoggedin');   
    }
 
}
