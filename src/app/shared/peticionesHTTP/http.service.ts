import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {  BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Rx';


/**
 * HttpCalls es un servicio que contiene tdoas las llamadas http al servidor
 * estas llamadas son asíncronas en segundo plano. Los objetos se JSON se guardan
 * en un objeto general. 
 * 
 * @author      Carlos Troyano Carmona
 * @version     %I%, %G%
 * @since       1.0
 * @see Injectable
 */
@Injectable()
export class HttpCalls  {
    // Wires up BlockUI instance
  @BlockUI() public blockUI: NgBlockUI;
  
  
  // Opciones de envio al servidor
  options: RequestOptions;  
  
  // Hash que indica si hay algo cargando
  
  public hashCargando = {
    'familias':false,
    'clientes':false,
    'productos':false,
    'tarifaArtciuloFamilia' :false,
    'tarifaTipoCliente' : false,
    'guardar' : false,
    'albaranes': false,
    'cobrosPendientes' : false,
    'historialCliente': false
  }; 
  
  
  /**
   * ´IP´ Esta es la constante de la ip al backend
   */
  public static readonly IP = "http://duwisonguitian.ddns.net";

  /**
   * ´SERVER_PATH´ Esta constante contiene el path del servidor backend
   * a donde van las consultas JSON. 
   */
  public static readonly SREVER_PATH = HttpCalls.IP +"/symfony/web/app_dev.php";
  
  // SOLO DESARROLLO
  public static readonly SREVER_PATH_LOCAL = "assets/JSON";
  public static readonly EXT = ".json";
  
  /**
   * ´objetosJSON´ Este objeto contiene tdoas als consultas al backend con objetos JSON
   * algunos son estáticos y otros dinámicos y se cambian a mediada que hace falta
   * en la aplicación.
   */  
  public objetosJSON = {
    clientes:null, 
    familias:null, 
    productos:null,
    tarifaArtciuloFamilia:null,
    tarifaTipoCliente:null,
    familiasLocal:null,
    albaranes:null,
    cobrosPendientes:null,
    historialCliente:null   
    };
  
  /**
   * ´PATHS´ Este objeto constante contiene los paths para las distintas consultas
   */
  public static readonly PATHS = {
    'familias':'/familias',
    'clientes':'/clientes',
    'productos':'/conexion',
    'tarifaArtciuloFamilia' :'/tarArtFam',
    'tarifaTipoCliente' : '/tarclitip',
    'guardar' : '/guardar/pedido',
    'albaranes': '/hisPre',
    'cobrosPendientes' : '/carCli',
    'historialCliente':'/hisArt'
  };
  
  // DEBUGING
  public objPruebas;


  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient, private http2: Http) {
    // console.log("creado servicio de objetos JSON")
    if(localStorage.getItem('provincia')) {
      this.getObjects(); 
      this.EstaCargando();
    }
  };
  
  /**
   * Variable dynamica para guardar los datos recibidos desde el servidor
   */
  public data$: BehaviorSubject<any> = new BehaviorSubject({}); 
  
  
  public EstaCargando() {
    let cargando = false;
    for (let key in this.hashCargando) {
      cargando = (cargando || this.hashCargando[key])
    }
    return cargando;
  }
  
    /**
     * ´getFamilias´ Devuelve las familias a nivel local para ver cuales tienen imagen
     * asociada. Tambien trae las familias del servidor y con eso construye el objeto
     * para mostrarlas.
     */
    public getFamilias() {
        this.blockUI.start("Cargando familias de productos.");
        this.hashCargando['familias'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['familias']).subscribe(data => {
          this.objetosJSON['familias'] = data;
          this.hashCargando['familias'] = false;
          if(!this.EstaCargando()) {
             this.blockUI.stop();
          }
          this.getFamiliasLocal();
          return data;
        }),
        error => console.log("Error: ", error),
        () => ((data)=>{
            this.data$.next(data);
        });
    }
    
    /**
     * ´getCobrosPendientes´ Devuelve si el cliente tiene cobros pendientes y la información
     * sobre estos pasandole un codigo de cliente
     */
    public getCobrosPendientes(codCli, cliente, callback) {
      this.blockUI.start("Cargando cobros pendientes de " + cliente + ".");
      this.hashCargando['cobrosPendientes'] = true;
      this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['cobrosPendientes'] + "?codcli=" + codCli ).subscribe(data => {
          this.objetosJSON['cobrosPendientes'] = data;
          console.log(data)
          this.hashCargando['cobrosPendientes'] = false;
          if(!this.EstaCargando()) {
             this.blockUI.stop();
          }
          callback();
          return data;
        }),
        error => console.log("Error: ", error),
        () => ((data)=>{
            this.data$.next(data);
        });
    }
    
    /**
     * ´getHistorialAlbaranes´ Devuelve si el hitorial de albaranes pasandole un codigo de cliente
     */
    public getHistorialAlbaranes(codCli, cliente, callback) {
        this.blockUI.start("Cargando historial de albaranes de " + cliente + ".");
          this.hashCargando['albaranes'] = true;
      this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['albaranes'] + "?codcli=" + codCli ).subscribe(data => {
          this.objetosJSON['albaranes'] = data;
          this.hashCargando['albaranes'] = false;
          if(!this.EstaCargando()) {
             this.blockUI.stop();
          }
          //console.log(data);
          callback();
          return data;
        }),
        error => console.log("Error: ", error),
        () => ((data)=>{
            this.data$.next(data);
        });
    }
/*
    *     'get EstadisticasPorClienteProducto´ recibe el codigo del cliente y devuelve las estadísticas de todos los articulos vendidos
    */
    public getEstadisticasPorClienteProducto(codCli, cliente, callback) {
      this.blockUI.start("Cargando estadisticas para " + cliente + ".");
        this.hashCargando['historialCliente'] = true;
      this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['historialCliente'] + "?codcli=" + codCli ).subscribe(data => {
       // console.log(data);
       // console.log(codCli);
        
        this.objetosJSON['historialCliente'] = data;
        this.hashCargando['historialCliente'] = false;
        if(!this.EstaCargando()) {
           this.blockUI.stop();
        }
        callback();
        return data;
        
        
      }),
      error => console.log("Error: ", error),
      () => ((data)=>{
          this.data$.next(data);
      });
    }
    
    
    /**
     * ´getFamiliasLocal´ Devuelve las familias a nivel local para ver cuales tienen imagen
     * asociada.
     */
    public getFamiliasLocal() {
     this.blockUI.start("Cargando familias de productos con imágenes locales.");
     this.hashCargando['familiasLocal'] = true;
     this.http.get(HttpCalls.SREVER_PATH_LOCAL + HttpCalls.PATHS['familias'] + HttpCalls.EXT).subscribe(data => {
          this.objetosJSON['familiasLocal'] = data;
          this.hashCargando['familiasLocal'] = false;
          if(!this.EstaCargando()) {
             this.blockUI.stop();
          }
          this.construirFamilias();
          return data;
        }),
        error => console.log("Error: ", error),
        () => ((data)=>{
            this.data$.next(data);
        }); 
    }
    
    /**
     * ´construirFamilias´ Construye el objeto de familias a partir de las familais locales y remotas.
     */
    public construirFamilias() {
      let arrayFamiliasFinal = [];
      let that = this;
      this.objetosJSON.familias.forEach(function(element, index) {
          let id = element["codfam"];
          let familiaCoincidientesArray = that.objetosJSON.familiasLocal.filter(function(familia){
            return familia["codfam"] === id;
          });
          if(familiaCoincidientesArray.length > 0) {
            arrayFamiliasFinal.push(familiaCoincidientesArray[0])  
          } else {
            let familia = element;
            familia["img"] = "assets/png/001-cutlery.png"
            arrayFamiliasFinal.push(familia)
          }
          
          
      })
      let todosProductos = that.objetosJSON.familiasLocal.filter(function(familia){
        return familia["codfam"] === '-1';
      });
      arrayFamiliasFinal.push(todosProductos[0])
      this.objetosJSON.familias = arrayFamiliasFinal;
    }

         
    
    /**
     * ´getDescuentosPorClienteProducto´ recibe el codigo del cliente y devuelve los productos 
     * de ese cliente que tienen un descuento por familia o un precio particular, encapsulado en un objeto.
     * También recibe un callback que se ejecuta asincronamente al terminar el proceso de 
     * transferencia de los datos desde el servidor del backend.
     * @param codAlmacen  Código del cliente del que se quieren conocer los descuentos y 
     * precios particulares.
     * @param callback Función que se ejecutará al terminar la transferencia. La función
     * recibe el array como parámetro para poder jugar con los datos una vez terminada la 
     * llmada en segundo plano al backend.
     */
    public getDescuentosPorClienteProducto(codCli, cliente, callback) {
      this.blockUI.start("Cargando descuentos para " + cliente + ".");
        this.hashCargando['tarifaArtciuloFamilia'] = true;
      this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['tarifaArtciuloFamilia'] + "?codcli=" + codCli ).subscribe(data => {
        this.objetosJSON['tarifaArtciuloFamilia'] = data;
        this.hashCargando['tarifaArtciuloFamilia'] = false;
        if(!this.EstaCargando()) {
           this.blockUI.stop();
        }
        callback(this.objetosJSON['tarifaArtciuloFamilia']);
      }),
      error => console.log("Error: ", error),
      () => ((data)=>{
          this.data$.next(data);
      });
    }
    
    
    /**
     * ´getPreciosPortipoCLiente´ recibe el tipo del cliente y devuelve los productos 
     * de ese cliente que tienen un descuento por tipo de cliente, encapsulado en un objeto.
     * También recibe un callback que se ejecuta asincronamente al terminar el proceso de 
     * transferencia de los datos desde el servidor del backend.
     * @param tipcli  Código del tipo de cliente del que se quieren conocer los 
     * precios por tipo de cliente.
     * @param callback Función que se ejecutará al terminar la transferencia. La función
     * recibe el array como parámetro para poder jugar con los datos una vez terminada la 
     * llmada en segundo plano al backend.
     */
    public getPreciosPortipoCLiente(tipCli, cliente, callback) {
      this.blockUI.start("Cargando precios para " + cliente + ".");
        this.hashCargando['tarifaTipoCliente'] = true;
      this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['tarifaTipoCliente'] + "?tipcli=" + tipCli ).subscribe(data => {
        this.objetosJSON['tarifaTipoCliente'] = data;
        this.hashCargando['tarifaTipoCliente'] = false;
        if(!this.EstaCargando()) {
           this.blockUI.stop();
        }
        callback(this.objetosJSON['tarifaTipoCliente']);
      }),
      error => console.log("Error: ", error),
      () => ((data)=>{
          this.data$.next(data);
      });
    }
    
    
    
    /**
     * ´getProductos´ recibe el codigo del almacen y devuelve los productos de uno
     * de los almacenes. Trabaja con Tenerife y Las Palmas
     * (00001 y 00002 correlartivamente). Se guardan los resultados en una variable
     * indexada con un array asociativo (tabla hash) en la posición 'productos'.
     *
     * @param codAlmacen  Código del almacen que .
     */
    public getProductos(codAlmacen) {
      let that = this;
      this.blockUI.start("Cargando productos de la base de datos.");
        this.hashCargando['productos'] = true;
      this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['productos'] + "?codprov=" + codAlmacen ).subscribe(data => {
        this.objetosJSON['productos'] = data;
        this.hashCargando['productos'] = false;
        if(!this.EstaCargando()) {
           this.blockUI.stop();
        }
         
        // DEBUGGIN
          // that.blockUI.start("Cargando datos de muestra.");
          // that.http.get(HttpCalls.SREVER_PATH_LOCAL + '/obj' + HttpCalls.EXT).subscribe(data => {
          //   that.objPruebas =  data;
          //     that.blockUI.stop();
          // }),
          // error => console.log("Error: ", error),
          // () => ((data)=>{
          //     that.data$.next(data);
          // });
          // FIN
          
         
      }),
      error => console.log("Error: ", error),
      () => ((data)=>{
          this.data$.next(data);
      });
      
    }


  
  
    /**
     * ´getObjects´ Es la función principal para obtener todos los objetos JSON
     * que deben cargarse al inicio de la conexión con la aplicación.
     *
     */
    public getObjects() {
    this.getFamilias();
    let codigoAlmacen = localStorage.provincia || '00002';  
    this.blockUI.start("Cargando clientes de la base de datos.");
      this.hashCargando['clientes'] = true;
    this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['clientes'] ).subscribe(data => {
      this.objetosJSON['clientes'] = data;
      this.hashCargando['clientes'] = false;
      if(!this.EstaCargando()) {
         this.blockUI.stop();
      }
    }),
    error => console.log("Error: ", error),
    () => ((data)=>{
        this.data$.next(data);
    });
    this.getProductos( codigoAlmacen );
    
  }
  
  public enviarPedidoServidor(obj:Object){
        // console.log("Procedindo al emnvio")
        let json = JSON.stringify(obj);
        // console.log(json);
        let headers = new Headers({"Content-Type":"application/json"});
        return this.http2.post(HttpCalls.SREVER_PATH + HttpCalls.PATHS['guardar'], json, this.options)
        .map(this.extractData)
        .catch(this.handleError);
       
    }
    
    private extractData(res: Response) {
        // console.log("RES", res)
        let json2 = res.json();
        return json2 || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server handle error';
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }
  
}