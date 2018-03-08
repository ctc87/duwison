import { Carrito } from './carritoCliente.class';


export class Cliente {
    
    public fecha_pedido: Date; 
    public carrito: Carrito;
    public tieneCobrosPendientes: boolean
    
    
    constructor(
        public metodoFacturacion : String,
        public id : number,
        public codigo : number,
        public codenv : number,
        public nombre : String,
        public collapsed : boolean,
        public empezadoPedido : boolean,
        public cobrosPendientes,
        public historialAlbaranes,
        public estadisticasCliente, //--------AÑADIDO DAMIAN
        todosProductosArray,
        arrayPreciosParticulares,
        //arrayDescuentosPorCliente,
        arrayDescuentosPorTipoCliente
        )
        {
          //  console.log(arrayPreciosParticulares);//viene vacio el array

            console.log("ARRAY POR TIPO EN LA CLASE CLIENTE", arrayDescuentosPorTipoCliente);//viene ok el array


            this.carrito = new Carrito(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, metodoFacturacion);
            this.fecha_pedido = new Date();
            this.tieneCobrosPendientes = cobrosPendientes.length > 1;
        };
        
    
  /**
   * ´generarPedido_JSON´ Este método genera el objeto JSON del pedido
   * para enviarlo al servidor.
   * @return Objeto JSON con el pedido
   */
   public generarPedido_JSON(codalm) {
        let pedido = {};
        let arrayPedido = this.objetToArray(this.carrito.productos, codalm);
  console.log(arrayPedido);
        return {
             codcli: this.codigo,
             codenv: this.codenv,
             observa: this.carrito.observa,
             pedido : arrayPedido
        }
   }
   
  /**
   * ´objetToArray´ Este método genera un array desde el objeto JSON
   * @return array productos
   */
    public objetToArray(obj, codalm){
        let arr = [];
        for(let key in obj){
          if(obj[key].cantidadPedido > 0) {
            arr.push(this.formatoProductoBD(obj[key], codalm));
          }
        }
        return arr;
    }
    
    private formatoProductoBD(producto, codalm) {
        return {
                codart:producto.codArt,           
                desmod:producto.nombre,
                canpre:producto.cantidadPedido,
                preven:producto.precio,
                unilot:producto.unilot,//AÑADIDO DAMIAN
                unidad:producto.unidad,//AÑADIDO DAMIAN
                peso:producto.peso,//AÑADIDO DAMIAN
                codalm:codalm
            }    
    }    
}


//   public cantidadPedido:number; 
    
//     constructor(public codArt, public nombre, public precio){
//         this.cantidadPedido = 0;    
//     };
    