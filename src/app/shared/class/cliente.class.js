"use strict";
var carritoCliente_class_1 = require('./carritoCliente.class');
var Cliente = (function () {
    function Cliente(metodoFacturacion, id, codigo, nombre, collapsed, empezadoPedido, cobrosPendientes, historialAlbaranes, estadisticasCliente, //--------AÑADIDO DAMIAN
        todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente) {
        this.metodoFacturacion = metodoFacturacion;
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.collapsed = collapsed;
        this.empezadoPedido = empezadoPedido;
        this.cobrosPendientes = cobrosPendientes;
        this.historialAlbaranes = historialAlbaranes;
        this.estadisticasCliente = estadisticasCliente;
        this.carrito = new carritoCliente_class_1.Carrito(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, metodoFacturacion);
        this.fecha_pedido = new Date();
        this.tieneCobrosPendientes = cobrosPendientes.length > 0;
    }
    ;
    /**
     * ´generarPedido_JSON´ Este método genera el objeto JSON del pedido
     * para enviarlo al servidor.
     * @return Objeto JSON con el pedido
     */
    Cliente.prototype.generarPedido_JSON = function (codalm) {
        var pedido = {};
        var arrayPedido = this.objetToArray(this.carrito.productos, codalm);
        return {
            codcli: this.codigo,
            "can": "B",
            pedido: arrayPedido
        };
    };
    /**
     * ´objetToArray´ Este método genera un array desde el objeto JSON
     * @return array productos
     */
    Cliente.prototype.objetToArray = function (obj, codalm) {
        var arr = [];
        for (var key in obj) {
            if (obj[key].cantidadPedido > 0) {
                arr.push(this.formatoProductoBD(obj[key], codalm));
            }
        }
        return arr;
    };
    Cliente.prototype.formatoProductoBD = function (producto, codalm) {
        return {
            codart: producto.codArt,
            desmod: producto.nombre,
            canpre: producto.cantidadPedido,
            preven: producto.precio,
            codalm: codalm
        };
    };
    return Cliente;
}());
exports.Cliente = Cliente;
//   public cantidadPedido:number; 
//     constructor(public codArt, public nombre, public precio){
//         this.cantidadPedido = 0;    
//     };
