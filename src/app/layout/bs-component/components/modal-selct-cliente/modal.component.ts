import { Component, Input,  OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpCalls } from '../../../../shared/peticionesHTTP/http.service';
import { DataService } from '../../../../shared/services/data.service';
import { SINGLE_SELECT_PRESET_VALUE_CONFIG, SINGLE_SELECT_PRESET_VALUE_CONFIG_2 } from './presetValueExample.config';
import { ExampleValues_Frameworks } from './selectize.configs';





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
    singleSelectConfig2: any = SINGLE_SELECT_PRESET_VALUE_CONFIG_2;
	singleSelectOptions: any;
	cliente: string; // Defaulted value.
	sleccionadoCLiente: boolean = false;
	formateadoArray = false;
	arrayCodigosEnvio: any;
    mostrarCodEnv = false
	placeholder = 'Click para seleccionar...';

    
    constructor(private modalService: NgbModal, public httpJson: HttpCalls, public dataService: DataService) { }

    ngOnInit() {
    }
    
    
    onChange($event) {
        this.mostrarCodEnv = false;
        let clienteNombre = this.singleSelectOptions.filter(
          cliente => cliente.codcli === $event);
         this.cliente = clienteNombre[0].clientes;
         this.dataService.clienteSeleccionado = { 
            codcli:$event, 
            clientes:this.cliente, 
            tarCli: clienteNombre[0].tarcli, 
            tipoCliente:clienteNombre[0].clientes,
            codenv:null
        };
        
        this.crearArrayDeCodigoEnvio();
        console.log(this.arrayCodigosEnvio)
        if(this.arrayCodigosEnvio.length > 1)
            this.mostrarCodEnv = true
        else
            this.sleccionadoCLiente = true;
    }
    
    seleccionarCodEnv($event) {
     this.sleccionadoCLiente = true;   
    }
    
    open(content) {
        this.mostrarCodEnv = false;
        let that = this;
        if(!this.formateadoArray)
            this.reformarArrayClientes();
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
    
    public reformarArrayClientes() {
        this.formateadoArray = true;
        console.log(this.httpJson.objetosJSON.clientes)
        this.httpJson.objetosJSON.clientes.forEach(function(element, index){
            if(element.nombreComercial)
                element.clientes = element.clientes + " " + element.nombreComercial;
        })
        console.log(this.httpJson.objetosJSON.clientes)
    }

    public crearArrayDeCodigoEnvio() {
        let that = this;
        this.arrayCodigosEnvio =  this.httpJson.objetosJSON.clientes.filter(function(element, index) {
            // console.log(that.dataService.clienteSeleccionado.codcli)
            // console.log(element.codcli)
            // console.log(that.dataService.clienteSeleccionado.codcli == element.codcli)
            return that.dataService.clienteSeleccionado.codcli == element.codcli;
        });
    }
    
    public clienteSeleccionado () {
        return this.sleccionadoCLiente;    
    }
    
    public close(){
        if(this.sleccionadoCLiente) {
         this.modalRef.close();  
        }
    }
}
