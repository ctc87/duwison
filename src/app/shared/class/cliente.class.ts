import { Carrito } from './carritoCliente.class';


export class Cliente {
    
    public fecha_pedido: Date; 
    public carrito: Carrito;
    public tieneCobrosPendientes: boolean
    
    
    constructor(
        public metodoFacturacion : String,
        public id : number,
        public codigo : number,
        public nombre : String,
        public collapsed : boolean,
        public empezadoPedido : boolean,
        public cobrosPendientes,
        public historialAlbaranes,
        public estadisticasCliente, //--------AÑADIDO DAMIAN
        todosProductosArray,
        arrayPreciosParticulares,
        arrayDescuentosPorTipoCliente
        )
        {
            this.carrito = new Carrito(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, metodoFacturacion);
            this.fecha_pedido = new Date();
            this.tieneCobrosPendientes = cobrosPendientes.length > 0;
        };
        
    
  /**
   * ´generarPedido_JSON´ Este método genera el objeto JSON del pedido
   * para enviarlo al servidor.
   * @return Objeto JSON con el pedido
   */
   public generarPedido_JSON(codalm) {
        let pedido = {};
        let arrayPedido = this.objetToArray(this.carrito.productos, codalm);
        return {
             codcli: this.codigo,
             "can": "B",
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
                codalm:codalm
            }
    }
    
}


//   public cantidadPedido:number; 
    
//     constructor(public codArt, public nombre, public precio){
//         this.cantidadPedido = 0;    
//     };
    