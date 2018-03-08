import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';

@Component({
    // selector: "[other-attr]"
    selector: '[app-modal-factura-detalle]',
    templateUrl: './modal-factura-detalle.component.html',
    styleUrls: ['./modal-factura-detalle.component.scss']
})
export class ModalFacturaDetalle {
    closeResult: string;
    @Input() reg;
    // @Input() cliente;
    constructor(private modalService: NgbModal, public dataService: DataService) { }

    
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        // this.dataService.asignarClienteActual(this.cliente);
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
    
    // public toFixed (val) {
    //     return String(Number(val).toFixed(2) + "€");
    // }
    
    // public quitarHoraFecha(fecha) {
    //     return fecha.split(" ")[0]; 
    // }    
    
    // public restarPedido(codProd) {
    //     console.log(Number(this.dataService.clienteActualPedido.carrito.productos[codProd]))
    //     if(Number(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido) > 0)
    //         this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido--;
    //     else
    //         this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = 0
    // }
    
    // public sumarPedido(codProd) {
    //     this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido++;
    // }
    
    // public deletePedido(codProd) {
    //     this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = 0
    // }
    
    // public comprobarValorNumerico(valor, codProd) {
    //     if(!this.dataService.reNumbers.test(String(this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido)))
    //         this.dataService.clienteActualPedido.carrito.productos[codProd].cantidadPedido = "";
    // }
}
