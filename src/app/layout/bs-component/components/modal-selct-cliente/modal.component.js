"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var presetValueExample_config_1 = require('./presetValueExample.config');
var ModalCliente = (function () {
    function ModalCliente(modalService, httpJson, dataService) {
        this.modalService = modalService;
        this.httpJson = httpJson;
        this.dataService = dataService;
        this.singleSelectConfig = presetValueExample_config_1.SINGLE_SELECT_PRESET_VALUE_CONFIG;
        this.sleccionadoCLiente = false;
        this.formateadoArray = false;
        this.placeholder = 'Click para seleccionar...';
    }
    ModalCliente.prototype.ngOnInit = function () {
    };
    ModalCliente.prototype.onChange = function ($event) {
        var clienteNombre = this.singleSelectOptions.filter(function (cliente) { return cliente.codcli === $event; });
        this.cliente = clienteNombre[0].clientes;
        this.dataService.clienteSeleccionado = {
            codcli: $event,
            clientes: this.cliente,
            tarCli: clienteNombre[0].tarcli,
            tipoCliente: clienteNombre[0].clientes
        };
        this.sleccionadoCLiente = true;
        console.log('cambiado');
    };
    ModalCliente.prototype.open = function (content) {
        var that = this;
        if (!this.formateadoArray)
            this.reformarArrayClientes();
        this.sleccionadoCLiente = false;
        this.singleSelectOptions = this.httpJson.objetosJSON.clientes.filter(function (element, index) {
            var aux = true;
            for (var i = 0; i < that.dataService.comercial.pedidos.length; i++) {
                aux = that.dataService.comercial.pedidos[i].codigo != element.codcli && aux;
            }
            return aux;
        });
        this.modalRef = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: true
        });
    };
    ModalCliente.prototype.reformarArrayClientes = function () {
        this.formateadoArray = true;
        console.log(this.httpJson.objetosJSON.clientes);
        this.httpJson.objetosJSON.clientes.forEach(function (element, index) {
            if (element.nombreComercial)
                element.clientes = element.clientes + " " + element.nombreComercial;
        });
        console.log(this.httpJson.objetosJSON.clientes);
    };
    ModalCliente.prototype.arrayDeCodigoEnvio = function () {
        var array = ;
    };
    ModalCliente.prototype.clienteSeleccionado = function () {
        return this.sleccionadoCLiente;
    };
    ModalCliente.prototype.close = function () {
        if (this.sleccionadoCLiente) {
            this.modalRef.close();
        }
    };
    __decorate([
        core_1.Input()
    ], ModalCliente.prototype, "nombre_boton");
    ModalCliente = __decorate([
        core_1.Component({
            selector: 'app-modal-clientes',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.scss']
        })
    ], ModalCliente);
    return ModalCliente;
}());
exports.ModalCliente = ModalCliente;
