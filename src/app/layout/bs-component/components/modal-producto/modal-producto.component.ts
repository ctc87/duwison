import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';

@Component({
    // selector: "[other-attr]"
    selector: '[app-modal-producto]',
    templateUrl: './modal-producto.component.html',
    styleUrls: ['./modal-producto.component.scss']
})
export class ModalProducto {
    closeResult: string;
    @Input() producto;
    @Input() cliente;
    constructor(private modalService: NgbModal, public dataService: DataService) { }

    
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.dataService.asignarClienteActual(this.cliente);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    
    public toFixed (val) {
        return String(Number(val).toFixed(2) + "€");
    }
    
    public quitarHoraFecha(fecha) {
        return fecha.split(" ")[0]; 
    }
    
    public deletePedido(codProd, prod) {
        let unilot = Number(prod.unilot);
        let precio = Number(prod.precio);
        let can = Number(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido);
        let resta = unilot > 0 ? (unilot * precio) : precio;
        this.dataService.clienteActualPedido.carrito.totalPrecioPedido -= resta * can;
        this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = 0
    }
      
    public restarPedido(codProd, prod) {
        if(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido > 0) {
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido--;
            let unilot = Number(prod.unilot);
            let precio = Number(prod.precio);
            let resta = unilot > 0 ? (unilot * precio) : precio;
            this.dataService.clienteActualPedido.carrito.totalPrecioPedido -= resta;   
        }
        else
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = 0;
        
        this.calcularTotal(codProd, prod);
    }

    public sumarPedido(codProd, prod) {
        this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido++;
        this.calcularTotal(codProd, prod);
        let unilot = Number(prod.unilot);
        let precio = Number(prod.precio);
        let suma = unilot > 0 ? (unilot * precio) : precio;
        this.dataService.clienteActualPedido.carrito.totalPrecioPedido += suma;
    }
    
    public comprobarValorNumerico(valor, codProd, prod) {
        if(!this.dataService.reNumbers.test(String(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido)))
            this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = "";
        this.calcularTotal(codProd, prod);
    }
    
    public calcularTotal(codProd, prod) {
        let can = Number(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido);
        let unilot = Number(prod.unilot);
        let precio = Number(prod.precio);
        if(unilot > 0)
            this.dataService.clienteActualPedido.carrito.productos[codProd].totalProducto = can * precio * unilot;
        else
            this.dataService.clienteActualPedido.carrito.productos[codProd].totalProducto = can * precio;
      //  console.log(this.dataService.clienteActualPedido.carrito.productos[codProd].totalProducto)
    }
}
