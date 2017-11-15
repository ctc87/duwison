import { Cliente } from './cliente.class';


export class Comercial {
    
    public nombre: String;
    public fecha_pedido: Date; 
    public pedidos: Array<Cliente>;
    
    constructor(public _nombre){
        this.nombre = _nombre;
        this.fecha_pedido = new Date();
        this.pedidos = [];
    };
    
}