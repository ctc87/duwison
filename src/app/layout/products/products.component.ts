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

 constructor(public dataService: DataService, public httpService: HttpCalls) {
    } 
    
    
    public ngOnInit() {
    }
    
    
    
    public restarPedido(codProd, prod) {
        if(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido > 0)
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido--;
        else
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = 0;
        
        this.calcularTotal(codProd, prod);
    }

    
    public sumarPedido(codProd, prod) {
        this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido++;
        this.calcularTotal(codProd, prod);
    }
    
    public comprobarValorNumerico(valor, codProd, prod) {
        if(!this.dataService.reNumbers.test(String(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido)))
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = "";
        this.calcularTotal(codProd, prod);
    }
    
    public calcularTotal(codProd, prod) {
        let can = Number(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido);
        let unilot = Number(prod.unilot);
        let precio = Number(prod.prevena);
        if(unilot > 0)
            this.dataService.clienteActualPedido.carrito.productos[codProd].totalProducto = can * precio * unilot;
        else
            this.dataService.clienteActualPedido.carrito.productos[codProd].totalProducto = can * precio;
    }
    
    public pesoVariable(unilot) {
         return unilot <= 0 ? "Peso de caja variable" : unilot
    }
    
    public totalVariable(unilot) {
         return !(unilot <= 0) ? "Total" : "Total por kilos pedidos<br/>(el precio final depende de la caja)"
    }
    


}
