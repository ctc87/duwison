import { Carrito } from './carritoCliente.class';


export class Cliente {
    
    public fecha_pedido: Date; 
    public carrito: Carrito;
    
    
    constructor(
        public metodoFacturacion : String,
        public id : number,
        public codigo : number,
        public nombre : String,
        public collapsed : boolean,
        public empezadoPedido : boolean,
        todosProductosArray,
        arrayPreciosParticulares,
        arrayDescuentosPorTipoCliente
        )
        {
            this.carrito = new Carrito(todosProductosArray, arrayPreciosParticulares, arrayDescuentosPorTipoCliente, metodoFacturacion);
            this.fecha_pedido = new Date();
        };
        
        
        
    
  /**
   * ´generarPedido_JSON´ Este método genera el objeto JSON del pedido
   * para enviarlo al servidor.
   * @return Objeto JSON con el pedido
   */
   public generarPedido_JSON() {
        let pedido = {};
        let arrayPedido = this.objetToArray(this.carrito.productos);
        return {
             codcli: this.codigo,
             pedido : arrayPedido
        }
   }
   
  /**
   * ´objetToArray´ Este método genera un array desde el objeto JSON
   * @return array productos
   */
    public objetToArray(obj){
        let arr = [];
        for(let key in obj){
          if(obj[key].cantidadPedido > 0)
            arr.push(obj[key]);
        }
        return arr;
    }
    
}


