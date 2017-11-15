"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_animations_1 = require('../../router.animations');
var ProductsComponent = (function () {
    function ProductsComponent(dataService, httpService) {
        this.dataService = dataService;
        this.httpService = httpService;
        this.productosArray = [];
        this.mensajes = [];
        this.alerts = [];
        this.productosArray = httpService.objetosJSON["productos"];
        this.mensajes = [
            {
                id: 1,
                type: 'success',
                message: "Empieza el pedido."
            }
        ];
        this.alerts.push(this.mensajes[0]);
    }
    ProductsComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    ProductsComponent.prototype.ngOnInit = function () {
        console.log(this.dataService.familia_actual.familia);
        var that = this;
        this.productosArray = this.httpService.objetosJSON["productos"].filter(function (element, index) {
            return Number(element.codfam) === Number(that.dataService.familia_actual.codfam);
        });
    };
    ProductsComponent.prototype.truncate = function (val) {
        return Number(val).toFixed(2);
    };
    ProductsComponent.prototype.quitar = function () {
        productosArray.
        ;
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.css'],
            animations: [router_animations_1.routerTransition()]
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
