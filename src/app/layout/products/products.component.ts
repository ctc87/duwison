import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { routerTransition } from '../../router.animations';
import { HttpCalls } from '../../shared';
import { Cliente } from '../../shared/class/cliente.class';
import { Producto } from '../../shared/class/producto.class';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
    animations: [routerTransition()]
})
export class ProductsComponent implements OnInit {
 productosArray = [];
 arrayProductosFamilia = [];
 arrayProductosFiltrados = [];
 mensajes = [];
 public alerts: Array<any> = [];
 public filtrado: String;
 public almacen: number;
 public cliente: Cliente;
 public reNumbers: RegExp = /^\d+$/;
 constructor(public dataService: DataService, public httpService: HttpCalls) {
   this.productosArray = httpService.objetosJSON["productos"];
   this.mensajes =  [
            {
                id: 1,
                type: 'success',
                message: `Empieza el pedido.`
            }
        ];
    this.alerts.push(this.mensajes[0]);
    } 
    
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    
    public ngOnInit() {
        console.log(this.dataService.clienteActualPedido)
        this.almacen = 1;
        console.log(this.dataService.familia_actual.familia);
        let that = this;
        this.arrayProductosFamilia = this.httpService.objetosJSON["productos"].filter(function(element, index){
            return Number(element.codfam) === Number(that.dataService.familia_actual.codfam) && 
            Number(element.cod_almacen) === that.almacen;    
            // ESTO ES PARA ALMACEN DE TENERIFE
        });
        this.arrayProductosFiltrados = this.arrayProductosFamilia;
        console.log(this.dataService.clienteActualPedido.carrito.productos)
    }
    
    public truncate(val) {
        return Number(val).toFixed(2)   
    }
    
    
    public filtrar($event) {
        let re = new RegExp(".*"+this.filtrado+".*", "ig");
        this.arrayProductosFiltrados = this.arrayProductosFamilia.filter(function(element, index){
            return re.test(element.articulo) || re.test(element.codart)
        });
    }
    
    public restarPedido(codProd) {
        if(this.dataService.clienteActualPedido.carrito.productos[codProd] > 0)
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido--;
        else
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = 0
    }

    
    public sumarPedido(codProd) {
        this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido++;
    }
    
    public comprobarValorNumerico(valor, codProd) {
        if(!this.reNumbers.test(String(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido)))
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = "";
    }
    


}
