"use strict";
var Producto = (function () {
    function Producto(codArt, nombre, precio) {
        this.codArt = codArt;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadPedido = 0;
    }
    ;
    return Producto;
}());
exports.Producto = Producto;
