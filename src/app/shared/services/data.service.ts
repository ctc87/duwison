import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpCalls } from '../peticionesHTTP/http';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class DataService {
  
  
  private messageSource = new BehaviorSubject<string>("Otros");
  familia_actual = this.messageSource.asObservable();
  
  public httpCalls : HttpCalls;
  ObjetosJSON = [];

  constructor(public http : HttpClient) { 
  //   console.log("construyendo servicio")
    this.httpCalls = new HttpCalls(this.http, this.ObjetosJSON)
    this.httpCalls.getObjects();
    console.log(this.ObjetosJSON)
    // this.httpCalls = new HttpCalls(this.http, this.ObjetosJSON)
  
  // console.log("http")
  // console.log(this.http)
  }
    
  cambiarFamilia(familia_seleccionada: string) {
   
    this.messageSource.next(familia_seleccionada)
    console.log(this.messageSource)
  }

 
  familiArray =  [
      {name:"Arroces", img:"assets/png/035-paella.png"},
      {name:"Comida Tem&aacute;tica", img:"assets/png/041-nachos.png"},
      {name:"Cuarta Gama", img:"assets/png/037-food-3.png"},
      {name:"Precocinados Refrigerados", img:"assets/png/049-refrigerator.png"},
      {name:"L&aacute;cteos", img:"assets/png/031-milk-products.png"},
      {name:"Precocinados Congelados", img:"assets/png/048-black.png"},
      {name:"Panader&iacute;a y Boller&iacute;a", img:"assets/png/029-food-5.png"},
      {name:"Pescados", img:"assets/png/019-fruit.png"},
      {name:"Ovoproductos", img:"assets/png/010-food-16.png"},
      {name:"Salsas", img:"assets/png/008-sauces.png"},
      {name:"Otros", img:"assets/png/001-pistachio-1.png"}
    ];
    
    arrayProductosSctock = [ 
    {
      familia:"Cuarta Gama", 
      productos:[
        {cantidadPedido:0, codArt:1, nombre:"producto 1", stock:20, precios:{a:10, b:50, c:20} },
        {cantidadPedido:0, codArt:2, nombre:"producto 2", stock:5, precios:{a:100, b:500, c:200} },
        {cantidadPedido:0, codArt:3, nombre:"producto 3", stock:2, precios:{a:5, b:20, c:28} },
        {cantidadPedido:0, codArt:4, nombre:"producto 4", stock:0, precios:{a:12, b:52, c:22} },
        {cantidadPedido:0, codArt:5, nombre:"producto 5", stock:10, precios:{a:11, b:51, c:21} }
      ]
    }, 
    {
      familia:"Otros", 
      productos:[
        {cantidadPedido:0, codArt:6, nombre:"producto 6", stock:20, precios:{a:10, b:50, c:20} },
        {cantidadPedido:0, codArt:7, nombre:"producto 7", stock:5, precios:{a:100, b:500, c:200} },
        {cantidadPedido:0, codArt:8, nombre:"producto 8", stock:2, precios:{a:5, b:20, c:28} },
        {cantidadPedido:0, codArt:9, nombre:"producto 9", stock:0, precios:{a:12, b:52, c:22} },
        {cantidadPedido:0, codArt:10, nombre:"producto 10", stock:10, precios:{a:11, b:51, c:21} }
      ]
    }
  ]
  
    clients = [];
     
    closeTagsCLients(index) {
     this.clients.forEach(function(elemnt, i) {
                if(i === index)
                    elemnt.collapsed = !elemnt.collapsed;
                else
                    elemnt.collapsed = true;
        }); 
    }
  
  clientes = [
                {nombre:'Hyper Dino', id:101, precio:'a'},
                {nombre:'Carrefour', id:102, precio:'b'},
                {nombre:'Macro', id:103, precio:'a'},
                {nombre:'Alcampo', id:104, precio:'c'},
                {nombre:'Comercial lopez', id:105, precio:'b'},
                {nombre:'Anaga comidas', id:106, precio:'a'},
                {nombre:'Restaurante Figaro', id:107, precio:'c'},
                {nombre:'Comidas a domicilio Pepe', id:108, precio:'b'},
                {nombre:'Comidas y reparados Ibañez S.L.', id:109, precio:'a'},
                {nombre:'Hiper Cor', id:110, precio:'c'},
                {nombre:'HiperTrebol', id:111, precio:'b'},
             ];
  
  pedidos = {
    comercial:"Candido Caballero", 
    fecha_pedido:new Date(), 
    pedidos:[
      { 
        codCli:101, 
        articulos:[
          {codArt:1, cantidadPedido:1},
          {codArt:2, cantidadPedido:2},
          {codArt:3, cantidadPedido:20}
        ]
      },
      { 
        codCli:102, 
        articulos:[
          {codArt:4, cantidadPedido:10},
          {codArt:2, cantidadPedido:20},
          {codArt:1, cantidadPedido:40}
        ]
      }
    ]
  }
  

  
}
