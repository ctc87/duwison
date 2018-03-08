import { Producto } from './producto.class';

/**
 * Carrito representa el carrito de la compra para un cliente. Contiene
 * tdos los productos disponibles dentro de un objeto llamado productos
 * que a su vez contiene objetos del tipo Prouctos. 
 * 
 * @author      Carlos Troyano Carmona
 * @version     %I%, %G%
 * @since       1.0
 * @see Producto
 */
export class Carrito {
    /**
     * ´productos´ contiene productos indexados por su referencia.
     */
    public productos = {};
    private preciosArticuloParticular = {};
    private descuentosFamilia = {};
    private preciosPorTipoCLiente = {};
    public totalPrecioPedido = 0; 
    public observa = 'Observaciones...';
    
    /**
     * ´constructor´ Recibe tdos los articulos e inicializa el objeto produtos.
     *
     * @param todosProductosArray  Array que contiene tdos los articulos disponibles.
     * @param arrayPreciosParticulares Array que contiene los precios particulares para un producto en un cliente
     * @param arrayDescuentosPorTipoCliente Array que contiene los precios por tipo de cliente.
     * o un descuento para una famiala para un cliente en particular.
     */
    constructor(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, tarifaCliente){
        console.log(arrayPreciosParticulares);//viene vacio el array
        this.inicizalizarCarrito(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, tarifaCliente);
    };
    
    /**
     * ´inicizalizarCarrito´ Recibe tdos los articulos e inicializa el objeto produtos.
     * como un array asociativo donde la clave para un producto es su codigo de articulo
     * o refrencia. La cual es su clave única en la base de datos. Se construye cada uno
     * cómo un objeto de la clase Producto.
     * 
     * @param arrayDescuentosPorTipoCliente Array que contiene los precios por tipo de cliente.
     * @param todosProductosArray  Array que contiene tdos los articulos disponibles.
     */
    private inicizalizarCarrito(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, tarifaCliente) {
        let that = this
        this.inicializarEstructurasDePrecios(arrayPreciosParticulares, arrayDescuentosPorTipoCliente);
        
        todosProductosArray.forEach(function(element, index) {
            
            //console.log(element.codart );//devuelve codart
            //console.log(tarifaCliente);//devuelve la tarifa (a)
            //console.log(that.definirPrecio(element.codart, element['preven' + tarifaCliente ])); //devuelve el precio
            that.productos[element.codart] = new Producto(element.codart, element.articulo, that.definirPrecio(element.codart, element['preven' + tarifaCliente]), element.unilot, element.peso, element.unidad);           
      
        });
    }
    
    private inicializarEstructurasDePrecios(arrayPreciosParticulares, arrayDescuentosPorTipoCliente) {
        let that = this;
      
        let arrayPreciosArticuloParticular = arrayPreciosParticulares.filter(function(articulo, index) {
            return articulo.codfam == "";
        });
        arrayPreciosArticuloParticular.forEach(function(articulo, index){
         
            that.preciosArticuloParticular[articulo.codart] = articulo.preven;
                        
          });
     

        let arrayDescuentosPorFamilia = arrayPreciosParticulares.filter(function(articulo, index) {
            return articulo.codfam != "";
        });
        
        arrayDescuentosPorFamilia.forEach(function(articulo, index){
            that.descuentosFamilia[articulo.codart] = articulo.descuento;
        });
        
        console.log(that.preciosPorTipoCLiente);
        
        arrayDescuentosPorTipoCliente.forEach(function(articulo, index) {
            // that.preciosPorTipoCLiente[articulo.codArt] = articulo.preven; 
 


        })        
     //  el objeto final que muestra el precio por tipo de cliente
        console.log("that.preciosPorTipoCLiente", that.preciosPorTipoCLiente)
    }
    
    /**
   * ´definirPrecio´ Este método calcula los precios
   * según el codArt y el cliente ya asignado esto en la jerarquía de un precio 
   * final ocupa las posciciones 1 y 3 por orden de pririoridad. Hay que tener en
   * cuenta que esta jerarquía es de la forma siguiente:
   * <ol>
   *    <li>
   *        Precio de articulo por codCli para un cliente en particular
   *        (cada cliente puede tener un precio espcial para un produto concreto)
   *     </li>
   *     <li>
   *        Precio por tipo de cliente
   *        (cada cliente puede tener un grupo al que perteneze y que tiene un precio
   *        especial para un articulo en particular por pertenecer a ese grupo.)
   *    </li>
   *    <li>
   *        Descuento pr familia y codCLi
   *        (Cada cliente puede tener un descuento aplicado a una familia de productos
   *        en particular)
   *    </li>
   *    <li>
   *        Tipo de tarifa por cliente.
   *        (Existen varios tipos de tarifa para cada producto [a,b,c,d,g,f] cada
   *        cliente tiene un tipo de tarifa en concreto.)
   *    </li>
   * </ol>
   *
   * Teniendo en cuenta todo esto se calcula el precio final recorriendo 
   * la jerarquía desde el primer caso hasta el segundo despues el cuarto 
   * y por último el tercero.
   * 
   * @param codCli código del cliente o identificador único en la base de datos.
   * @param arrayDePreciosCliente Array que contiene los descuentos y los precios
   * que dependen del codCli(casos 1 y 3).
   */

    private definirPrecio(codArt, precioTarificado) {
        //console.log(codArt);//devuelve el codart
        //console.log(this.preciosArticuloParticular[codArt]);//undefined
        //console.log(this.preciosPorTipoCLiente[codArt]);//undefined 
       // console.log(this.preciosArticuloParticular);//undefined


        if(this.preciosArticuloParticular[codArt]) {

            return this.preciosArticuloParticular[codArt];

        } else if(this.preciosPorTipoCLiente[codArt]) {
            console.log("entro en definir precio  IF 2");

          
            return this.preciosPorTipoCLiente[codArt]

        } else { 
            if(this.descuentosFamilia[codArt]) {          
            //return (precioTarificado - (precioTarificado * (this.descuentosFamilia[codArt] * 100)));  
            return precioTarificado;
            } else {
            return precioTarificado;   
            }
        }
         
    }
    
    
    
}