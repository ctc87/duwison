import { Articulo } from './articulo';
export class Pedido {
    public articulos: Array<Articulo>;
    public codCli: number;
    
    constructor(codCli: number) {
        this.codCli = codCli;
    }
    
    
    pushArticuloCreado(articulo: Articulo) {
        this.articulos.push(articulo);
    }
    
    pushArticulo(codArt:number, cantidad:number) {
        this.articulos.push(new Articulo(cantidad, codArt));       
    }
    // popArticulo(co) {
        
    // }
    
    
    
}