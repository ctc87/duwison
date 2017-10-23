import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';


export class HttpComponent implements OnInit {
  public static readonly IP = "192.168.10.107";
  public static readonly SREVER_PATH = "appLorkel/web/app_dev.php";
  public static readonly PATHS = [
    {  
        nombre:'familias',
        path:'/familias'
    },
    {  
        nombre:'clientes',
        path:'/clientes'
    },
    {  
        nombre:'productos',
        path:'/conexion'
    }
  ];
  
//   results: string[];


 
 /**
  * 
  * FALTA AUN ACABAR ESTO PARA HACER LAS LLAMADAS HTTP Y GUARDAR EN OBJETOS EN EL SERVICIO TODAS LAS VARIABLES.
  *
  **/
  
  
  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient, public dataService: DataService) {}
 
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('/api/items').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
    });
  }
  
  getObjects() {
      this.http.get('/api/items').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
    });
  }
  
}