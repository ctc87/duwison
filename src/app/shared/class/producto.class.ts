export class Producto {
    
    public cantidadPedido:number; 
    
    constructor(public codArt, public nombre, public precio){
        this.cantidadPedido = 0;    
    };
    
}