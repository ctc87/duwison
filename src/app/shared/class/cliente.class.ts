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
        todosProductosArray
        )
        {
            this.carrito = new Carrito(todosProductosArray);
            this.fecha_pedido = new Date();
        };
    
}


