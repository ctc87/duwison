import { Producto } from './producto.class';

export class Carrito {
    public productos = {};
    constructor(todosProductosArray){
        this.inicizalizarCarrito(todosProductosArray);
        
    };
    
    private inicizalizarCarrito(todosProductosArray) {
        let that = this
        todosProductosArray.forEach(function(element, index) {
            that.productos[element.codart] = new Producto(element.codart, element.articulo, "por definir");           
        });
    }
}