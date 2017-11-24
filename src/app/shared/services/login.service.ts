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

@Injectable()
export class LoginService {  
    headers: Headers;
    options: RequestOptions;

    constructor (private http: Http) {}
    public servidor = "http://192.168.10.15";
    public LoginUrl  = this.servidor + "/appLorkel/web/app_dev.php/login";
    public identity;
    public token;
    
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