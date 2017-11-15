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
        this.cambiarBotonAccion();
        this.actualizarListaProductosCliente()
    }
    
    // carrito.productos
    
    actualizarListaProductosCliente() {
        let that = this;
        let cliente = this.dataService.comercial.pedidos.filter(function(element, index){
            return Number(element.codigo) === Number(that.codcli)
        });
        console.log("PRODUCTOS CLIENTE")
        let obj = cliente[0].carrito.productos;
        console.log(cliente[0])
        var result = Object.keys(obj).map(function(key) {
                return obj[key];
        });
        this.listaProductosCliente = result.filter(function(element, index){
            return element.cantidadPedido > 0
                

        });
        console.log("lista productos cliente")
        console.log(this.listaProductosCliente);
      
      
    }
    
    
    
    
}
