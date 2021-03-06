import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Comercial } from '../class/comercial.class';
import { Cliente } from '../class/cliente.class';
import { HttpCalls } from '../peticionesHTTP/http.service';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
 
/**
 * DataService es un servicio que contiene todas los metdos y datos
 * compartidos a traves de la aplicación. Aquí es donde se guardan los datos 
 * de los epdidos en tiempo real.
 * 
 * @author      Carlos Troyano Carmona
 * @version     %I%, %G%
 * @since       1.0
 * @see Injectable
 */
@Injectable()
export class DataService {
    
  private messageSource = new BehaviorSubject<string>("Otros");
  public familia_actual = {codfam:null, familia:null};
  public alerts: Array<any> = [];
  public errores = [];
  public LIM = 10;
  public comercial : Comercial;
  public clienteActualPedido: Cliente;
  public productosArray;
  public arrayProductosFamilia;
  public arrayProductosFiltrados;
  public filtrando = false;
  mensajes = [];
  public filtrado: String;
  public almacen: number;
  public reNumbers: RegExp = /^\d+$/;

  public provincia = {
      '00001' : 'Santa cruz de Tenerife',
      '00002' : 'Las Palmas de Gran canaria'    
  }
  
  public showedProv;
  
  public clienteSeleccionado = { codcli:null, clientes:null, tarCli:null, tipoCliente:null, codenv:null };
  
  
  constructor(public httpCalls: HttpCalls , private router: Router) { 
  this.errores =  [{
            id: 1,
            type: 'success',
            message: `Pulsa el botón superior para empezar a añadir clientes.`
        }, {
            id: 2,
            type: 'danger',
            message: `No se permiten más de ` + this.LIM + ` clientes.`
        }];
        this.comercial = new Comercial("Com_ex_1");
        
  }
  
  // DEBUGGIN
  // public cargarPruebas() {
  //   this.comercial = this.httpCalls.objPruebas;
  // }
  
  public cambiarDatosComercial(nombre : string, provincia : number, mail : string) {
      this.comercial.nombre  = nombre;
      this.comercial.provincia = provincia;
      this.comercial.mail = mail;
  }
  
  public mostrarError(error : number) {
    if(this.alerts.length <= 0)
      this.alerts.push(this.errores[error]);
  }
  
  public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
  }
  
  public cerrar(num) {
   this.comercial.pedidos.forEach(function(elemnt, i) {
            if(i != num)
                elemnt.collapsed = true;
    });
  }
  
  public addClient(selected) {
   // console.log(this.clienteSeleccionado.codenv)
    if(!selected) {
      let that = this;
      if(this.alerts[0] && this.alerts[0].id === 1) {
         this.closeAlert(this.alerts[0]);
      }
      if(that.comercial.pedidos.length < that.LIM) {
      let indexx = this.comercial.pedidos.length;
      this.httpCalls.getHistorialAlbaranes(that.clienteSeleccionado.codcli, that.clienteSeleccionado.clientes, function(){
        that.httpCalls.getEstadisticasPorClienteProducto(that.clienteSeleccionado.codcli, that.clienteSeleccionado.clientes, function(){         //--------AÑADIDO DAMIAN 
        that.httpCalls.getCobrosPendientes(that.clienteSeleccionado.codcli, that.clienteSeleccionado.clientes, function(){
          that.httpCalls.getDescuentosPorClienteProducto(that.clienteSeleccionado.codcli, that.clienteSeleccionado.clientes, function(arrayDescuentosPorCliente){
            that.httpCalls.getPreciosPortipoCLiente(that.clienteSeleccionado.tipoCliente, that.clienteSeleccionado.clientes, function(arrayDescuentosPorTipoCliente){
             console.log("array tipo clientes venido del http calls", arrayDescuentosPorTipoCliente);
              that.comercial.insertarCliente(
                that.clienteSeleccionado.tarCli,
                indexx,
                that.clienteSeleccionado.codcli,
                that.clienteSeleccionado.codenv,
                that.clienteSeleccionado.clientes, 
                true,
                false,
                that.httpCalls.objetosJSON['cobrosPendientes'],
                that.httpCalls.objetosJSON['albaranes'],
                that.httpCalls.objetosJSON['historialCliente'],//--------AÑADIDO DAMIAN 
                that.httpCalls.objetosJSON['productos'],
                arrayDescuentosPorCliente, 
                arrayDescuentosPorTipoCliente
              );
            });
           });
          });//--------AÑADIDO DAMIAN 
        });
      });
     } else {
      that.mostrarError(1);
     }
    }    

  } 
    
  public cambiarFamilia(familia_seleccionada: string) {
   
    this.messageSource.next(familia_seleccionada)
  };
  
  public nombreFormateado(name) {
    return name[0] + (name.toLowerCase()).slice(1);
  };
  
  public asignarClienteActual(cliente) {
    this.clienteActualPedido = cliente;
  }  
   
  public closeTagsCLients(index) {
   this.comercial.pedidos.forEach(function(element, i) {
              if(element.codigo === index)
                  element.collapsed = !element.collapsed;
              else
                  element.collapsed = true;
      }); 
  }
    
    public truncate(val) {
        return Number(val).toFixed(2)   
    }    
    
    public filtrar() {
        let re = new RegExp(".*"+this.filtrado+".*", "ig");
        this.arrayProductosFiltrados = this.arrayProductosFamilia.filter(function(element, index){
            return re.test(element.articulo) || re.test(element.codart)
        });
    }    
    
    public confirmarPedido (data) {
      if( data.status === 'ok') {
         this.router.navigate(['/'], {skipLocationChange: true});
         window.location.reload();
      }
    }  
  
  getProvincia() {    
    this.showedProv = this.provincia[localStorage.getItem('provincia')];
  }
  
}
