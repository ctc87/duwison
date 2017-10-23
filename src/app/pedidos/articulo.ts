export class Articulo {
    public cantidadPedido: number;
    public codArt: number;
    
    constructor(cantidadPedido: number, codArt: number) {
        this.cantidadPedido = cantidadPedido;
        this.codArt = codArt;
    }
}