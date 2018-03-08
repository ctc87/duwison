import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { HttpCalls } from '../../shared';  //AÑADIDO DAMIAN - LOGIN
import { DataService } from '../../shared';//AÑADIDO DAMIAN - LOGIN
import { Router } from '@angular/router';  //AÑADIDO DAMIAN - LOGIN
import { BlockUI, NgBlockUI } from 'ng-block-ui';//AÑADIDO DAMIAN - LOGIN
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class LoginService {  
    headers: Headers;
    options: RequestOptions;   
   
    public user;            // INICIO AÑADIDO DAMIAN ---------------------------
    public errorMessage;    // INICIO AÑADIDO DAMIAN ---------------------------
    public logged = false;  // INICIO AÑADIDO DAMIAN ---------------------------
    @BlockUI() public blockUI: NgBlockUI;// INICIO AÑADIDO DAMIAN ---------------------------
    jwtHelper: JwtHelper = new JwtHelper();

    //constructor (private http: Http) {}
    constructor (private http: Http,public httpCall : HttpCalls, public router: Router, public dataService: DataService) {}//AÑADIDO DAMIAN - LOGIN

    public servidor = "http://duwisonguitian.ddns.net:8081";
    public LoginUrl  = this.servidor + "/symfony/web/app_dev.php/login";
    public identity;
    public token;
    public token2;

    // INICIO AÑADIDO DAMIAN---------------------------

    useJwtHelper() {

        var user={
            "email":"",
            "password":"",
            "gethash":"false"
        }; 

       // console.log("Entro en useJwtHelper - LoginService");   
        
        var var_token = localStorage.getItem('token'); 
        var decodedUser =             this.jwtHelper.decodeToken(var_token).email;
        var decodedPass =             this.jwtHelper.decodeToken(var_token).password;
        user.email=decodedUser;
        user.password=decodedPass;
        return user;      
      }


    refreshToken() 
    {    
        var user={
            "email":"",
            "password":"",
            "gethash":"true"
        }; 

        user.email =  this.useJwtHelper().email;
        user.password =  this.useJwtHelper().password;   
        this.signup(user).subscribe(
        response=>{
                this.token = response;
                    
                    if (this.token.length <=0)
                    {
                        alert("Error");
                        console.log("Error en la comunicación servidor");         
                    }
                    else
                    {           
                        localStorage.removeItem('token'); 
                        localStorage.setItem('token', JSON.stringify(this.token));
                        //this.dataService.cambiarDatosComercial(
                        //        (localStorage.nombre.trim() + " " + localStorage.apellidos.trim()),
                        //        localStorage.provincia,
                        //        localStorage.email                                        
                        //    );        
                            // ANTES DE LLAMAR ESTO ELEGIR PROVINCIA
                            //this.dataService.getProvincia();
                        //    this.logged = true;
                        }

            }, error=>{
                this.errorMessage = <any>error;
                    if(this.errorMessage!=null)
                    {
                    console.log("Error desde componente "+this.errorMessage);
                    }                  
                })
    } 


    onLoggedin(any,callback) { 
       
        this.user=any;
        this.blockUI.start("iniciando sesión.");
        this.signup(this.user).
        subscribe(response=>{            
            let identity = response;
            this.identity = identity;            
 
            if (this.identity.status =="error")
            {
                alert("Usuario y/o contraseña incorrecta");
                console.log("Error en la comunicación/logueo servidor.");
                this.blockUI.stop();
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
                    this.signup(this.user).subscribe(
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
                                    localStorage.setItem('token', token);  
                                    this.blockUI.stop(); 
                                    this.dataService.cambiarDatosComercial(
                                        (localStorage.nombre.trim() + " " + localStorage.apellidos.trim()),
                                         localStorage.provincia,
                                         localStorage.email                                        
                                    );
                                                     
                                    // ANTES DE LLAMAR ESTO ELEGIR PROVINCIA
                                    this.dataService.getProvincia();
                                    this.logged = true;
                                    callback();
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

     finishLogin() {
        this.httpCall.getObjects(); 
        this.httpCall.EstaCargando();
        this.router.navigate(['/dashboard'], {skipLocationChange: true});
        
    }
     // FIN AÑADIDO DAMIAN---------------------------

    public signup(user_to_login:Object)
    {
        let json = JSON.stringify(user_to_login);        
        let params = "login="+json;
        let headers = new Headers({"Content-Type":"application/x-www-form-urlencoded"});
         return this.http.post(this.LoginUrl, params,{headers:headers})     
        .map(this.extractData)
        .catch(this.handleError);      
    }

    public getIdentity()
    {
        let identity = JSON.parse(localStorage.getItem("identity"));
        if(identity != "undefined")
        {
            this.identity = identity;    
        }
        else{
            this.identity = null;
        }

        return this.identity;
    }

    public getToken()
    {
        let token = localStorage.getItem("token");
        if(token != "undefined")
        {
           this.token = token;    
        }
        else{
            this.token = null;
        }

       return this.token;
    }
  
    private extractData(res: Response) {
        let json2 = res.json();
        return json2 || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server handle error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}