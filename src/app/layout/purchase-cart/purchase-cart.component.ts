import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../shared/services/data.service';
import { HttpCalls } from '../../shared/peticionesHTTP/http.service';
import { Router,RouterModule } from '@angular/router';



@Component({
    selector: 'app-purchase-cart',
    templateUrl: './purchase-cart.component.html',
    styleUrls: ['./purchase-cart.component.scss'],
    animations: [routerTransition()]
})


export class CartComponent implements OnInit {
    
    mensajes = [];
    public alerts: Array<any> = [];
    public arrayPedidos = [];
    codPedidoActual;
    pedidoActual;
    
    constructor(public dataService: DataService, public http: HttpCalls, public router: Router) {
        this.mensajes =  [
            {
                id: 1,
                type: 'success',
                message: `Para manipular un producto haga click encima. Para cambiar de pedido pulse en seleccionar pedido.`
            },
            {
                id: 3,
                type: 'warning',
                message: `\"Enviar pedidos\" enviará tods los pedidos!!!!`
            },
            {
                id: 2,
                type: 'danger',
                message: `No hay ningún pedido todavía.`
            }
        ];
        
    }
    
    
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
     
    ngOnInit() {

        

        this.arrayPedidos = this.filtrarPedidosVacios(this.dataService.comercial.pedidos);
        if(this.arrayPedidos.length > 0) {
            this.codPedidoActual = this.arrayPedidos[0].codigo;
            this.pedidoActual = this.arrayPedidos[0]; 
            this.alerts.push(this.mensajes[0]);
            this.alerts.push(this.mensajes[1]);
        } else {
            this.alerts.push(this.mensajes[2]);
            //this.router.navigate(['/dashboard']);
        }
    }
    
    
    public enviarPedido() {
        let peido: Object;
        let pedido = this.generarObjetoJSON_Pedido();
        // console.log("procede a suscribirse ")
        this.http.enviarPedidoServidor(pedido).subscribe(
          (data) => this.dataService.confirmarPedido(data)
        );   
        
        alert("Pedido enviado"); 
        
        window.location.reload();        
        
    }
    
    
    // ENVIAR ESTE OBJETO 
    public generarObjetoJSON_Pedido() {
        // console.log("creando objeto")
        return this.dataService.comercial.generarPedidos_JSON();  
    }
    
    public onChange($event) {
        // console.log($event)
     this.seleccionarPedidoActual($event)
    }
    
    public seleccionarPedidoActual($event) {
        let that = this;
        let auxArr = this.arrayPedidos.filter(function(pedido, index){
            return pedido.codigo === $event;
        }) 
        this.pedidoActual = auxArr[0];
        // console.log(this.pedidoActual.nombre)
    }
    
  public filtrarPedidosVacios(pedidos) {
    let that = this;
      return pedidos.filter(function(pedido, index){
        return that.pedidoVacio(pedido);
      }) 
  }
  
  
  public pedidoVacio(pedido) {
      return (this.objetToArray(pedido.carrito.productos).length > 0);
  }
  
  public objetToArray(obj){
    let arr = [];
    for(let key in obj){
      if(obj[key].cantidadPedido > 0)
        arr.push(obj[key])
    }
    return arr;
  }
  
  public stringifi(str) { return JSON.stringify(str)}
}
