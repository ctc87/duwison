import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ModalCancelar, ModalCliente } from '../../../layout/bs-component/components';



@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})

export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() sizeOut: string;
    @Input() index: number;
    @Input() codcli: number;
    @Input() cobrosPendientes: boolean;
    
    cobrosPendientesArray = [];
    alabaranesArray = [];
    estadisticasArray = [];//--------AÑADIDO DAMIAN
    
    totalPrecioPedido;
    cobrosCadena = "";
    empezadoPedido = false;
    listaProductosCliente = []; 
    
    @Input() isCollapsed;
    @Output() event: EventEmitter<any> = new EventEmitter();
    
    boton_accion = {
     accion:"Empezar",
     tipo:"success"
    }
    
    cambiarBotonAccion() {
        if(this.empezadoPedido) {
            this.boton_accion.accion = "Modificar";
            this.boton_accion.tipo = "warning";
        } else {
            this.boton_accion.accion = "Empezar";
            this.boton_accion.tipo = "success";
        }
    }
    
    empezarPedido() {
        let that = this;
        let cliente = this.dataService.comercial.pedidos.filter(function(element, index) {
                return element.codigo == that.codcli;
            });
        cliente[0].empezadoPedido = true;
        this.empezadoPedido = cliente[0].empezadoPedido;
        this.dataService.asignarClienteActual(cliente[0]);
        this.cambiarBotonAccion();
    }
    
    constructor(public dataService: DataService) { 
    }
    
    ngOnInit() {
        let that = this;
        let cliente = this.dataService.comercial.pedidos.filter(function(element, index) {
            return Number(element.codigo) === Number(that.codcli);
        });
        this.empezadoPedido = cliente[0].empezadoPedido;
        this.cobrosPendientesArray = cliente[0].cobrosPendientes;
       // console.log("HISTORIAL ALABARANES")
        this.alabaranesArray = cliente[0].historialAlbaranes;
        this.estadisticasArray = cliente[0].estadisticasCliente;//-------AÑADIDO DAMIAN
        //console.log(cliente[0].estadisticasCliente);
        //console.log(cliente[0].historialAlbaranes);
        
        
        this.cambiarBotonAccion();
        this.actualizarListaProductosCliente()
        if(this.cobrosPendientes) {
        // if(this.cobrosPendientesArray[0].impdeb>0) {// ------AÑADIDO DAMIAN   
            console.log("TIENE COBROS PENDIENTES")
         this.bgClass = "cobrosPendientes";
         this.icon = "fa-exclamation-triangle";
         this.cobrosCadena += "El cliente tiene pagos pendientes!!"
        }
    // }
    }
    
    
    // inicializarPreciosArticuloCPorCLiente
    /**
     * ´actualizarListaProductosCliente´ este método sleciona el cliente que representa
     * el card (la clase en si). Convierte el carrito de la compra en un array y filtra 
     * solo los productos que tengan una cantidad mayor que 0 en el pedido para mostrarlos
     * en el carrito de la compra.
     *
     */
    actualizarListaProductosCliente() {
        let that = this;
        let cliente = this.dataService.comercial.pedidos.filter(function(element, index){
            return Number(element.codigo) === Number(that.codcli)
        });
        let obj = cliente[0].carrito.productos;
        this.totalPrecioPedido = cliente[0].carrito.totalPrecioPedido;
        let result = Object.keys(obj).map(function(key) {
                return obj[key];
        });
        this.listaProductosCliente = result.filter(function(element, index){
            return element.cantidadPedido > 0
        });
            
    }   
    
    
}
