import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class HttpCalls  {
  // public static readonly IP = "192.168.10.107";
  // public static readonly SREVER_PATH = "appLorkel/web/app_dev.php";
  public static readonly SREVER_PATH = "assets/JSON";
  public static readonly EXT = ".json";
  public objetosJSON = {clientes:null, familias:null, productos:null};
  public static readonly PATHS = {
    'familias':'/familias',
    'clientes':'/clientes',
    'productos':'/conexion'
  };
  


  // Inject HttpClient into your component or service.
  
  constructor(private http: HttpClient) {
    console.log("creado servicio de objetos JSON")
    this.getObjects(); 
  };
  
  public data$: BehaviorSubject<any> = new BehaviorSubject({});


  // public getObjects() {
  //   this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['familias'] + HttpCalls.EXT).subscribe(data => {
  //     this.objetosJSON['familias'] = data;
  //   });
  //   this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['clientes'] + HttpCalls.EXT).subscribe(data => {
  //     this.objetosJSON['clientes'] = data;
  //   });
  //   this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['productos'] + HttpCalls.EXT).subscribe(data => {
  //     this.objetosJSON['productos'] = data;
  //   });
    
  // }
  
    public getFamilias() {
       this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['familias'] + HttpCalls.EXT).subscribe(data => {
          this.objetosJSON['familias'] = data;
          return data;
        }),
        error => console.log("Error: ", error),
        () => ((data)=>{
            this.data$.next(data);
        });
    }
  
    public getObjects() {
    this.getFamilias();
    this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['clientes'] + HttpCalls.EXT).subscribe(data => {
      this.objetosJSON['clientes'] = data;
    }),
    error => console.log("Error: ", error),
    () => ((data)=>{
        this.data$.next(data);
    });
    this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['productos'] + HttpCalls.EXT).subscribe(data => {
      this.objetosJSON['productos'] = data;
    }),
    error => console.log("Error: ", error),
    () => ((data)=>{
        this.data$.next(data);
    });
  }
  
}