import { Pedido } from './pedido';

export class Pedidos {
    public pedidos: Array<Pedido>;
    public comercial: string;
    fecha_pedido: Date;
    
    constructor(comercial: string) {
        this.comercial = comercial;
        this.fecha_pedido = new Date();
    }
    
    pushArticuloCreado(pedido: Pedido) {
        this.pedidos.push(pedido);
    }
    
    pushArticulo(codArt:number, cantidad:number) {
        this.pedidos.push(new Pedido(codArt));       
    }
}