export class Producto {
    
    public cantidadPedido:number; 
    public totalProducto:number; 
    
    constructor(public codArt, public nombre, public precio, public unilot){
        this.cantidadPedido = 0;
        this.totalProducto = 0;
    };
    
}