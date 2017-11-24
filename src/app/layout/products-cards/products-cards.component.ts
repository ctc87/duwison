import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { routerTransition } from '../../router.animations';
import { HttpCalls } from '../../shared';
import { Cliente } from '../../shared/class/cliente.class';
import { Producto } from '../../shared/class/producto.class';


@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.css'],
    animations: [routerTransition()]
})
export class ProductsCardsComponent implements OnInit {

 constructor(public dataService: DataService, public httpService: HttpCalls) {
    } 
    
    
    public ngOnInit() {
        console.log(this.dataService.arrayProductosFiltrados)
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
        if(!this.dataService.reNumbers.test(String(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido)))
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = "";
    }
    


}
