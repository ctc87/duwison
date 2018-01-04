"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var comercial_class_1 = require('../class/comercial.class');
/**
 * DataService es un servicio que contiene todas los metdos y datos
 * compartidos a traves de la aplicación. Aquí es donde se guardan los datos
 * de los epdidos en tiempo real.
 *
 * @author      Carlos Troyano Carmona
 * @version     %I%, %G%
 * @since       1.0
 * @see Injectable
 */
var DataService = (function () {
    function DataService(httpCalls, router) {
        this.httpCalls = httpCalls;
        this.router = router;
        this.messageSource = new BehaviorSubject_1.BehaviorSubject("Otros");
        this.familia_actual = { codfam: null, familia: null };
        this.alerts = [];
        this.errores = [];
        this.LIM = 10;
        this.mensajes = [];
        this.reNumbers = /^\d+$/;
        this.provincia = {
            '00001': 'Santa cruz de Tenerife',
            '00002': 'Las Palmas de Gran canaria'
        };
        this.clienteSeleccionado = { codcli: null, clientes: null, tarCli: null, tipoCliente: null };
        this.errores = [{
                id: 1,
                type: 'success',
                message: "Pulsa el bot\u00F3n superior para empezar a a\u00F1adir clientes."
            }, {
                id: 2,
                type: 'danger',
                message: "No se permiten m\u00E1s de " + this.LIM + " clientes."
            }];
        this.comercial = new comercial_class_1.Comercial("Com_ex_1");
    }
    // DEBUGGIN
    // public cargarPruebas() {
    //   this.comercial = this.httpCalls.objPruebas;
    // }
    DataService.prototype.cambiarDatosComercial = function (nombre, provincia, mail) {
        this.comercial.nombre = nombre;
        this.comercial.provincia = provincia;
        this.comercial.mail = mail;
    };
    DataService.prototype.mostrarError = function (error) {
        if (this.alerts.length <= 0)
            this.alerts.push(this.errores[error]);
    };
    DataService.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    DataService.prototype.cerrar = function (num) {
        this.comercial.pedidos.forEach(function (elemnt, i) {
            if (i != num)
                elemnt.collapsed = true;
        });
    };
    DataService.prototype.addClient = function (selected) {
        if (!selected) {
            var that_1 = this;
            if (this.alerts[0] && this.alerts[0].id === 1) {
                this.closeAlert(this.alerts[0]);
            }
            if (that_1.comercial.pedidos.length < that_1.LIM) {
                var indexx_1 = this.comercial.pedidos.length;
                this.httpCalls.getHistorialAlbaranes(that_1.clienteSeleccionado.codcli, that_1.clienteSeleccionado.clientes, function () {
                    that_1.httpCalls.getEstadisticasPorClienteProducto(that_1.clienteSeleccionado.codcli, that_1.clienteSeleccionado.clientes, function () {
                        that_1.httpCalls.getCobrosPendientes(that_1.clienteSeleccionado.codcli, that_1.clienteSeleccionado.clientes, function () {
                            that_1.httpCalls.getDescuentosPorClienteProducto(that_1.clienteSeleccionado.codcli, that_1.clienteSeleccionado.clientes, function (arrayDescuentosPorCliente) {
                                that_1.httpCalls.getPreciosPortipoCLiente(that_1.clienteSeleccionado.tipoCliente, that_1.clienteSeleccionado.clientes, function (arrayDescuentosPorTipoCliente) {
                                    that_1.comercial.insertarCliente(that_1.clienteSeleccionado.tarCli, indexx_1, that_1.clienteSeleccionado.codcli, that_1.clienteSeleccionado.clientes, true, false, that_1.httpCalls.objetosJSON['cobrosPendientes'], that_1.httpCalls.objetosJSON['albaranes'], that_1.httpCalls.objetosJSON['historialCliente'], //--------AÑADIDO DAMIAN 
                                    that_1.httpCalls.objetosJSON['productos'], arrayDescuentosPorCliente, arrayDescuentosPorTipoCliente);
                                });
                            });
                        }); //--------AÑADIDO DAMIAN 
                    });
                });
            }
            else {
                that_1.mostrarError(1);
            }
        }
    };
    DataService.prototype.cambiarFamilia = function (familia_seleccionada) {
        this.messageSource.next(familia_seleccionada);
    };
    ;
    DataService.prototype.nombreFormateado = function (name) {
        return name[0] + (name.toLowerCase()).slice(1);
    };
    ;
    DataService.prototype.asignarClienteActual = function (cliente) {
        this.clienteActualPedido = cliente;
    };
    DataService.prototype.closeTagsCLients = function (index) {
        this.comercial.pedidos.forEach(function (element, i) {
            if (element.codigo === index)
                element.collapsed = !element.collapsed;
            else
                element.collapsed = true;
        });
    };
    DataService.prototype.truncate = function (val) {
        return Number(val).toFixed(2);
    };
    DataService.prototype.filtrar = function () {
        var re = new RegExp(".*" + this.filtrado + ".*", "ig");
        this.arrayProductosFiltrados = this.arrayProductosFamilia.filter(function (element, index) {
            return re.test(element.articulo) || re.test(element.codart);
        });
    };
    DataService.prototype.confirmarPedido = function (data) {
        if (data.status === 'ok') {
            this.router.navigate(['/']);
            window.location.reload();
        }
    };
    DataService.prototype.getProvincia = function () {
        this.showedProv = this.provincia[localStorage.getItem('provincia')];
        console.log(localStorage.getItem('provincia'));
        console.log(this.showedProv);
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
