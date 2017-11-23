import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Comercial } from '../class/comercial.class';
import { Cliente } from '../class/cliente.class';
import { HttpCalls } from '../peticionesHTTP/http.service';



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
  mensajes = [];
  public filtrado: String;
  public almacen: number;
  public reNumbers: RegExp = /^\d+$/;
  
  public clienteSeleccionado = { codcli:null, clientes:null, tarCli:null, tipoCliente:null };
  
  
  constructor(public httpCalls: HttpCalls) { 
  this.errores =  [{
            id: 1,
            type: 'success',
            message: `Pulsa el botón superior para empezar a añadir clientes.`
        }, {
            id: 2,
            type: 'danger',
            message: `No se permiten más de ` + this.LIM + ` clientes.`
        }];
        this.comercial = new Comercial("Com_ex_1")
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
  
  public addClient() {
    let that = this;
    if(this.alerts[0] && this.alerts[0].id === 1) {
       this.closeAlert(this.alerts[0]);
    }
    let indexx = this.comercial.pedidos.length;
    this.httpCalls.getDescuentosPorClienteProducto(this.clienteSeleccionado.codcli, this.clienteSeleccionado.clientes, function(arrayDescuentosPorCliente){
      that.httpCalls.getPreciosPortipoCLiente(that.clienteSeleccionado.tipoCliente, that.clienteSeleccionado.clientes, function(arrayDescuentosPorTipoCliente){
        if(that.comercial.pedidos.length < that.LIM) {
          console.log(that.clienteSeleccionado)
          that.comercial.insertarCliente(
              that.clienteSeleccionado.tarCli,
              indexx,
              that.clienteSeleccionado.codcli,
              that.clienteSeleccionado.clientes, 
              true,
              false,
              that.httpCalls.objetosJSON['productos'],
              arrayDescuentosPorCliente, 
              arrayDescuentosPorTipoCliente
        );
       } else {
        this.mostrarError(1);
       }
      });
    });
   
  } 
    
  public cambiarFamilia(familia_seleccionada: string) {
   
    this.messageSource.next(familia_seleccionada)
    console.log(this.messageSource)
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
    
    
    public filtrar($event) {
        let re = new RegExp(".*"+this.filtrado+".*", "ig");
        console.log(this.arrayProductosFamilia)
        this.arrayProductosFiltrados = this.arrayProductosFamilia.filter(function(element, index){
            return re.test(element.articulo) || re.test(element.codart)
        });
    }

  

  
}
