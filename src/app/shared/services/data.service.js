"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var carritoCliente_class_1 = require('../class/carritoCliente.class');
var DataService = (function () {
    function DataService() {
        this.messageSource = new BehaviorSubject_1.BehaviorSubject("Otros");
        this.familia_actual = { codfam: null, familia: null };
        this.alerts = [];
        this.errores = [];
        this.LIM = 10;
        this.clienteSeleccionado = { codcli: null, clientes: null };
        this.familiArray = [
            { name: "Arroces", img: "assets/png/035-paella.png" },
            { name: "Comida Tem&aacute;tica", img: "assets/png/041-nachos.png" },
            { name: "Cuarta Gama", img: "assets/png/037-food-3.png" },
            { name: "Precocinados Refrigerados", img: "assets/png/049-refrigerator.png" },
            { name: "L&aacute;cteos", img: "assets/png/031-milk-products.png" },
            { name: "Precocinados Congelados", img: "assets/png/048-black.png" },
            { name: "Panader&iacute;a y Boller&iacute;a", img: "assets/png/029-food-5.png" },
            { name: "Pescados", img: "assets/png/019-fruit.png" },
            { name: "Ovoproductos", img: "assets/png/010-food-16.png" },
            { name: "Salsas", img: "assets/png/008-sauces.png" },
            { name: "Otros", img: "assets/png/001-pistachio-1.png" }
        ];
        this.arrayProductosSctock = [
            {
                familia: "Cuarta Gama",
                productos: [
                    { cantidadPedido: 0, codArt: 1, nombre: "producto 1", stock: 20, precios: { a: 10, b: 50, c: 20 } },
                    { cantidadPedido: 0, codArt: 2, nombre: "producto 2", stock: 5, precios: { a: 100, b: 500, c: 200 } },
                    { cantidadPedido: 0, codArt: 3, nombre: "producto 3", stock: 2, precios: { a: 5, b: 20, c: 28 } },
                    { cantidadPedido: 0, codArt: 4, nombre: "producto 4", stock: 0, precios: { a: 12, b: 52, c: 22 } },
                    { cantidadPedido: 0, codArt: 5, nombre: "producto 5", stock: 10, precios: { a: 11, b: 51, c: 21 } }
                ]
            },
            {
                familia: "Otros",
                productos: [
                    { cantidadPedido: 0, codArt: 6, nombre: "producto 6", stock: 20, precios: { a: 10, b: 50, c: 20 } },
                    { cantidadPedido: 0, codArt: 7, nombre: "producto 7", stock: 5, precios: { a: 100, b: 500, c: 200 } },
                    { cantidadPedido: 0, codArt: 8, nombre: "producto 8", stock: 2, precios: { a: 5, b: 20, c: 28 } },
                    { cantidadPedido: 0, codArt: 9, nombre: "producto 9", stock: 0, precios: { a: 12, b: 52, c: 22 } },
                    { cantidadPedido: 0, codArt: 10, nombre: "producto 10", stock: 10, precios: { a: 11, b: 51, c: 21 } }
                ]
            }
        ];
        this.clients = [];
        this.clientes = [
            { nombre: 'Hyper Dino', id: 101, precio: 'a' },
            { nombre: 'Carrefour', id: 102, precio: 'b' },
            { nombre: 'Macro', id: 103, precio: 'a' },
            { nombre: 'Alcampo', id: 104, precio: 'c' },
            { nombre: 'Comercial lopez', id: 105, precio: 'b' },
            { nombre: 'Anaga comidas', id: 106, precio: 'a' },
            { nombre: 'Restaurante Figaro', id: 107, precio: 'c' },
            { nombre: 'Comidas a domicilio Pepe', id: 108, precio: 'b' },
            { nombre: 'Comidas y reparados Ibañez S.L.', id: 109, precio: 'a' },
            { nombre: 'Hiper Cor', id: 110, precio: 'c' },
            { nombre: 'HiperTrebol', id: 111, precio: 'b' },
        ];
        this.pedidos = {
            comercial: "Candido Caballero",
            fecha_pedido: new Date(),
            pedidos: [
                {
                    codCli: 101,
                    articulos: [
                        { codArt: 1, cantidadPedido: 1 },
                        { codArt: 2, cantidadPedido: 2 },
                        { codArt: 3, cantidadPedido: 20 }
                    ]
                },
                {
                    codCli: 102,
                    articulos: [
                        { codArt: 4, cantidadPedido: 10 },
                        { codArt: 2, cantidadPedido: 20 },
                        { codArt: 1, cantidadPedido: 40 }
                    ]
                }
            ]
        };
        this.errores = [{
                id: 1,
                type: 'success',
                message: "Pulsa Nuevo pedidos paa empezar a a\u00F1adir clientes"
            }, {
                id: 2,
                type: 'danger',
                message: "No se permiten mas de " + this.LIM + " clientes."
            }];
    }
    DataService.prototype.mostrarError = function (error) {
        if (this.alerts.length <= 0)
            this.alerts.push(this.errores[error]);
    };
    DataService.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    DataService.prototype.cerrar = function (num) {
        this.clients.forEach(function (elemnt, i) {
            if (i != num)
                elemnt.collapsed = true;
        });
    };
    DataService.prototype.addClient = function () {
        console.log("ejec");
        if (this.alerts[0] && this.alerts[0].id === 1) {
            this.closeAlert(this.alerts[0]);
        }
        var indexx = this.clients.length;
        if (this.clients.length < this.LIM) {
            console.log(this.clienteSeleccionado);
            this.clients.push({
                metodoFacturacion: "a",
                id: indexx,
                codcli: this.clienteSeleccionado.codcli,
                clientes: this.clienteSeleccionado.clientes,
                collapsed: true,
                carrito: new carritoCliente_class_1.Carrito(),
                index: (indexx - 1),
                empezadoPedido: false
            });
        }
        else {
            this.mostrarError(1);
        }
    };
    DataService.prototype.cambiarFamilia = function (familia_seleccionada) {
        this.messageSource.next(familia_seleccionada);
        console.log(this.messageSource);
    };
    DataService.prototype.nombreFormateado = function (name) {
        return name[0] + (name.toLowerCase()).slice(1);
    };
    ;
    DataService.prototype.closeTagsCLients = function (index) {
        this.clients.forEach(function (element, i) {
            if (element.codcli === index)
                element.collapsed = !element.collapsed;
            else
                element.collapsed = true;
        });
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
