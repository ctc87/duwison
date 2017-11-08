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
    

    @Input() isCollapsed;
    @Output() event: EventEmitter<any> = new EventEmitter();
    
    boton_accion = {
     accion:"Empezar",
     tipo:"success"
    }
    
    cambiarBotonAccion(pedido_vacio) {
        if(!pedido_vacio) {
            this.boton_accion.accion = "Modificar";
            this.boton_accion.tipo = "warning";
        } else {
            this.boton_accion.accion = "Empezar";
            this.boton_accion.tipo = "success";
        }
    }
    
    constructor(public dataService: DataService) { 
    }
    ngOnInit() {}
    
    
}
