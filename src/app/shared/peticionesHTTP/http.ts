import { HttpClient } from '@angular/common/http';



export class HttpCalls  {
  // public static readonly IP = "192.168.10.107";
  // public static readonly SREVER_PATH = "appLorkel/web/app_dev.php";
  public static readonly SREVER_PATH = "assets/JSON";
  public static readonly EXT = ".JSON";

  // private http: HttpClient = new HttpClient();
  public static readonly PATHS = {
    'familias':'/familias',
    'clientes':'/clientes',
    'productos':'/conexion'
  };
  


  // Inject HttpClient into your component or service.
  
  constructor(private http: HttpClient, private objetosArray:Array<Object>) {}
  // constructor(private http: HttpClient){}
 
  
  public getObjects() {
    this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['familias'] + HttpCalls.EXT).subscribe(data => {
      this.objetosArray.push({objeto:'familias', data});
    });
    this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['clientes'] + HttpCalls.EXT).subscribe(data => {
      this.objetosArray.push({objeto:'clientes', data});
    });
    this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['productos'] + HttpCalls.EXT).subscribe(data => {
      this.objetosArray.push({objeto:'productos', data});
    });
    
  }
  
}