import { Component, Input,  OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpCalls } from '../../../../shared/peticionesHTTP/http.service';
import { DataService } from '../../../../shared/services/data.service';
import {SINGLE_SELECT_PRESET_VALUE_CONFIG, MULTI_SELECT_PRESET_VALUE_CONFIG} from './presetValueExample.config';
import {ExampleValues_Frameworks} from './selectize.configs';





@Component({
    selector: 'app-modal-clientes',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalCliente implements OnInit {
    closeResult: string;
    @Input() nombre_boton: string;
    private modalRef: NgbModalRef;
    
    singleSelectConfig: any = SINGLE_SELECT_PRESET_VALUE_CONFIG;
	singleSelectOptions: any;
	cliente: string; // Defaulted value.
	sleccionadoCLiente: boolean = false;

	placeholder = 'Click to select...';
    
    constructor(private modalService: NgbModal, public httpJson: HttpCalls, public dataService: DataService) { }

    ngOnInit() {
    }
    
    
    onChange($event) {
        let clienteNombre = this.singleSelectOptions.filter(
          cliente => cliente.codcli === $event);
         this.cliente = clienteNombre[0].clientes;
         this.dataService.clienteSeleccionado = { 
            codcli:$event, 
            clientes:this.cliente, 
            tarCli: clienteNombre[0].tarcli, 
            tipoCliente:clienteNombre[0].clientes
        };
        this.sleccionadoCLiente = true;
    }
    
    
    open(content) {
        let that = this;
        this.sleccionadoCLiente = false;
        this.singleSelectOptions = this.httpJson.objetosJSON.clientes.filter(function(element, index){
            let aux = true;
            for(let i = 0; i < that.dataService.comercial.pedidos.length; i++) {
                aux = that.dataService.comercial.pedidos[i].codigo != element.codcli && aux;  
            }
            return aux;
        });
        
       this.modalRef = this.modalService.open(content, {
              backdrop : 'static',
              keyboard : true
        })
    }


    
    public clienteSeleccionado () {
        return this.sleccionadoCLiente;    
    }
    
    public close(){
        if(this.sleccionadoCLiente) {
         console.log( this.modalRef)
         this.modalRef.close();  
        }
    }
}
