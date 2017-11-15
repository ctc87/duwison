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
  
  
  constructor(public httpCalls: HttpCalls) { 
  this.errores =  [{
            id: 1,
            type: 'success',
            message: `Pulsa Nuevo pedidos paa empezar a añadir clientes`
        }, {
            id: 2,
            type: 'danger',
            message: `No se permiten mas de ` + this.LIM + ` clientes.`
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
    if(this.alerts[0] && this.alerts[0].id === 1) {
       this.closeAlert(this.alerts[0]);
    }
    let indexx = this.comercial.pedidos.length;
    if(this.comercial.pedidos.length < this.LIM) {
      console.log(this.clienteSeleccionado)
      this.comercial.pedidos.push(new Cliente(
            "a",
            indexx,
            this.clienteSeleccionado.codcli,
            this.clienteSeleccionado.clientes, 
            true,
            false,
            this.httpCalls.objetosJSON['productos']
            )
      );
     } else {
        this.mostrarError(1);
     }
  } 
  
  clienteSeleccionado = { codcli:null, clientes:null};
    
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
  
   
  closeTagsCLients(index) {
   this.comercial.pedidos.forEach(function(element, i) {
              if(element.codigo === index)
                  element.collapsed = !element.collapsed;
              else
                  element.collapsed = true;
      }); 
  }

  

  
}
