"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var ng_block_ui_1 = require('ng-block-ui');
var Rx_1 = require('rxjs/Rx');
/**
 * HttpCalls es un servicio que contiene tdoas las llamadas http al servidor
 * estas llamadas son asíncronas en segundo plano. Los objetos se JSON se guardan
 * en un objeto general.
 *
 * @author      Carlos Troyano Carmona
 * @version     %I%, %G%
 * @since       1.0
 * @see Injectable
 */
var HttpCalls = (function () {
    // Inject HttpClient into your component or service.
    function HttpCalls(http, http2) {
        this.http = http;
        this.http2 = http2;
        // Hash que indica si hay algo cargando
        this.hashCargando = {
            'familias': false,
            'clientes': false,
            'productos': false,
            'tarifaArtciuloFamilia': false,
            'tarifaTipoCliente': false,
            'guardar': false,
            'albaranes': false,
            'cobrosPendientes': false,
            'historialCliente': false
        };
        /**
         * ´objetosJSON´ Este objeto contiene tdoas als consultas al backend con objetos JSON
         * algunos son estáticos y otros dinámicos y se cambian a mediada que hace falta
         * en la aplicación.
         */
        this.objetosJSON = {
            clientes: null,
            familias: null,
            productos: null,
            tarifaArtciuloFamilia: null,
            tarifaTipoCliente: null,
            familiasLocal: null,
            albaranes: null,
            cobrosPendientes: null,
            historialCliente: null
        };
        /**
         * Variable dynamica para guardar los datos recibidos desde el servidor
         */
        this.data$ = new BehaviorSubject_1.BehaviorSubject({});
        // console.log("creado servicio de objetos JSON")
        if (localStorage.getItem('provincia')) {
            this.getObjects();
            this.EstaCargando();
        }
    }
    ;
    HttpCalls.prototype.EstaCargando = function () {
        var cargando = false;
        for (var key in this.hashCargando) {
            cargando = (cargando || this.hashCargando[key]);
        }
        return cargando;
    };
    /**
     * ´getFamilias´ Devuelve las familias a nivel local para ver cuales tienen imagen
     * asociada. Tambien trae las familias del servidor y con eso construye el objeto
     * para mostrarlas.
     */
    HttpCalls.prototype.getFamilias = function () {
        var _this = this;
        this.blockUI.start("Cargando familias de productos.");
        this.hashCargando['familias'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['familias']).subscribe(function (data) {
            _this.objetosJSON['familias'] = data;
            _this.hashCargando['familias'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            _this.getFamiliasLocal();
            return data;
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´getCobrosPendientes´ Devuelve si el cliente tiene cobros pendientes y la información
     * sobre estos pasandole un codigo de cliente
     */
    HttpCalls.prototype.getCobrosPendientes = function (codCli, cliente, callback) {
        var _this = this;
        this.blockUI.start("Cargando cobros pendientes de " + cliente + ".");
        this.hashCargando['cobrosPendientes'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['cobrosPendientes'] + "?codcli=" + codCli).subscribe(function (data) {
            _this.objetosJSON['cobrosPendientes'] = data;
            _this.hashCargando['cobrosPendientes'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            callback();
            return data;
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´getHistorialAlbaranes´ Devuelve si el hitorial de albaranes pasandole un codigo de cliente
     */
    HttpCalls.prototype.getHistorialAlbaranes = function (codCli, cliente, callback) {
        var _this = this;
        this.blockUI.start("Cargando historial de albaranes de " + cliente + ".");
        this.hashCargando['albaranes'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['albaranes'] + "?codcli=" + codCli).subscribe(function (data) {
            _this.objetosJSON['albaranes'] = data;
            _this.hashCargando['albaranes'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            //console.log(data);
            callback();
            return data;
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /*
        *     'get EstadisticasPorClienteProducto´ recibe el codigo del cliente y devuelve las estadísticas de todos los articulos vendidos
        */
    HttpCalls.prototype.getEstadisticasPorClienteProducto = function (codCli, cliente, callback) {
        var _this = this;
        this.blockUI.start("Cargando estadisticas para " + cliente + ".");
        this.hashCargando['historialCliente'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['historialCliente'] + "?codcli=" + codCli).subscribe(function (data) {
            // console.log(data);
            // console.log(codCli);
            _this.objetosJSON['historialCliente'] = data;
            _this.hashCargando['historialCliente'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            callback();
            return data;
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´getFamiliasLocal´ Devuelve las familias a nivel local para ver cuales tienen imagen
     * asociada.
     */
    HttpCalls.prototype.getFamiliasLocal = function () {
        var _this = this;
        this.blockUI.start("Cargando familias de productos con imágenes locales.");
        this.hashCargando['familiasLocal'] = true;
        this.http.get(HttpCalls.SREVER_PATH_LOCAL + HttpCalls.PATHS['familias'] + HttpCalls.EXT).subscribe(function (data) {
            _this.objetosJSON['familiasLocal'] = data;
            _this.hashCargando['familiasLocal'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            _this.construirFamilias();
            return data;
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´construirFamilias´ Construye el objeto de familias a partir de las familais locales y remotas.
     */
    HttpCalls.prototype.construirFamilias = function () {
        var arrayFamiliasFinal = [];
        var that = this;
        this.objetosJSON.familias.forEach(function (element, index) {
            var id = element["codfam"];
            var familiaCoincidientesArray = that.objetosJSON.familiasLocal.filter(function (familia) {
                return familia["codfam"] === id;
            });
            if (familiaCoincidientesArray.length > 0) {
                arrayFamiliasFinal.push(familiaCoincidientesArray[0]);
            }
            else {
                var familia = element;
                familia["img"] = "assets/png/001-cutlery.png";
                arrayFamiliasFinal.push(familia);
            }
        });
        var todosProductos = that.objetosJSON.familiasLocal.filter(function (familia) {
            return familia["codfam"] === '-1';
        });
        arrayFamiliasFinal.push(todosProductos[0]);
        this.objetosJSON.familias = arrayFamiliasFinal;
    };
    /**
     * ´getDescuentosPorClienteProducto´ recibe el codigo del cliente y devuelve los productos
     * de ese cliente que tienen un descuento por familia o un precio particular, encapsulado en un objeto.
     * También recibe un callback que se ejecuta asincronamente al terminar el proceso de
     * transferencia de los datos desde el servidor del backend.
     * @param codAlmacen  Código del cliente del que se quieren conocer los descuentos y
     * precios particulares.
     * @param callback Función que se ejecutará al terminar la transferencia. La función
     * recibe el array como parámetro para poder jugar con los datos una vez terminada la
     * llmada en segundo plano al backend.
     */
    HttpCalls.prototype.getDescuentosPorClienteProducto = function (codCli, cliente, callback) {
        var _this = this;
        this.blockUI.start("Cargando descuentos para " + cliente + ".");
        this.hashCargando['tarifaArtciuloFamilia'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['tarifaArtciuloFamilia'] + "?codcli=" + codCli).subscribe(function (data) {
            _this.objetosJSON['tarifaArtciuloFamilia'] = data;
            _this.hashCargando['tarifaArtciuloFamilia'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            callback(_this.objetosJSON['tarifaArtciuloFamilia']);
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´getPreciosPortipoCLiente´ recibe el tipo del cliente y devuelve los productos
     * de ese cliente que tienen un descuento por tipo de cliente, encapsulado en un objeto.
     * También recibe un callback que se ejecuta asincronamente al terminar el proceso de
     * transferencia de los datos desde el servidor del backend.
     * @param tipcli  Código del tipo de cliente del que se quieren conocer los
     * precios por tipo de cliente.
     * @param callback Función que se ejecutará al terminar la transferencia. La función
     * recibe el array como parámetro para poder jugar con los datos una vez terminada la
     * llmada en segundo plano al backend.
     */
    HttpCalls.prototype.getPreciosPortipoCLiente = function (tipCli, cliente, callback) {
        var _this = this;
        this.blockUI.start("Cargando precios para " + cliente + ".");
        this.hashCargando['tarifaTipoCliente'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['tarifaTipoCliente'] + "?tipcli=" + tipCli).subscribe(function (data) {
            _this.objetosJSON['tarifaTipoCliente'] = data;
            _this.hashCargando['tarifaTipoCliente'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            callback(_this.objetosJSON['tarifaTipoCliente']);
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´getProductos´ recibe el codigo del almacen y devuelve los productos de uno
     * de los almacenes. Trabaja con Tenerife y Las Palmas
     * (00001 y 00002 correlartivamente). Se guardan los resultados en una variable
     * indexada con un array asociativo (tabla hash) en la posición 'productos'.
     *
     * @param codAlmacen  Código del almacen que .
     */
    HttpCalls.prototype.getProductos = function (codAlmacen) {
        var _this = this;
        var that = this;
        this.blockUI.start("Cargando productos de la base de datos.");
        this.hashCargando['productos'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['productos'] + "?codprov=" + codAlmacen).subscribe(function (data) {
            _this.objetosJSON['productos'] = data;
            _this.hashCargando['productos'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
            // DEBUGGIN
            // that.blockUI.start("Cargando datos de muestra.");
            // that.http.get(HttpCalls.SREVER_PATH_LOCAL + '/obj' + HttpCalls.EXT).subscribe(data => {
            //   that.objPruebas =  data;
            //     that.blockUI.stop();
            // }),
            // error => console.log("Error: ", error),
            // () => ((data)=>{
            //     that.data$.next(data);
            // });
            // FIN
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
    };
    /**
     * ´getObjects´ Es la función principal para obtener todos los objetos JSON
     * que deben cargarse al inicio de la conexión con la aplicación.
     *
     */
    HttpCalls.prototype.getObjects = function () {
        var _this = this;
        this.getFamilias();
        var codigoAlmacen = localStorage.provincia || '00002';
        this.blockUI.start("Cargando clientes de la base de datos.");
        this.hashCargando['clientes'] = true;
        this.http.get(HttpCalls.SREVER_PATH + HttpCalls.PATHS['clientes']).subscribe(function (data) {
            _this.objetosJSON['clientes'] = data;
            _this.hashCargando['clientes'] = false;
            if (!_this.EstaCargando()) {
                _this.blockUI.stop();
            }
        }),
            function (error) { return console.log("Error: ", error); },
            function () { return (function (data) {
                _this.data$.next(data);
            }); };
        this.getProductos(codigoAlmacen);
    };
    HttpCalls.prototype.enviarPedidoServidor = function (obj) {
        // console.log("Procedindo al emnvio")
        var json = JSON.stringify(obj);
        // console.log(json);
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http2.post(HttpCalls.SREVER_PATH + HttpCalls.PATHS['guardar'], json, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HttpCalls.prototype.extractData = function (res) {
        // console.log("RES", res)
        var json2 = res.json();
        return json2 || {};
    };
    HttpCalls.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server handle error';
        // console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    /**
     * ´IP´ Esta es la constante de la ip al backend
     */
    HttpCalls.readonly = IP = "http://duwisonguitian.ddns.net";
    /**
     * ´SERVER_PATH´ Esta constante contiene el path del servidor backend
     * a donde van las consultas JSON.
     */
    HttpCalls.readonly = SREVER_PATH = HttpCalls.IP + "/symfony/web/app_dev.php";
    // SOLO DESARROLLO
    HttpCalls.readonly = SREVER_PATH_LOCAL = "assets/JSON";
    HttpCalls.readonly = EXT = ".json";
    /**
     * ´PATHS´ Este objeto constante contiene los paths para las distintas consultas
     */
    HttpCalls.readonly = PATHS = {
        'familias': '/familias',
        'clientes': '/clientes',
        'productos': '/conexion',
        'tarifaArtciuloFamilia': '/tarArtFam',
        'tarifaTipoCliente': '/tarclitip',
        'guardar': '/guardar/pedido',
        'albaranes': '/hisPre',
        'cobrosPendientes': '/pagPen',
        //'cobrosPendientes' : '/carCli',
        'historialCliente': '/hisArt'
    };
    __decorate([
        ng_block_ui_1.BlockUI()
    ], HttpCalls.prototype, "blockUI");
    HttpCalls = __decorate([
        core_1.Injectable()
    ], HttpCalls);
    return HttpCalls;
}());
exports.HttpCalls = HttpCalls;
