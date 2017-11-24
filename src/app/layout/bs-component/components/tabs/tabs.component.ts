import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { HttpCalls } from '../../../../shared/peticionesHTTP/http.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  
  public arrayPedidosDeTresEntres = [];
  constructor(public httppc : HttpCalls, public dataService : DataService) { }

  ngOnInit() {
    // this.dataService.comercial = this.httppc.objPruebas;
    console.log(this.dataService.comercial)
    this.separarPedidosDeTresEnTres();
    
  }
  
  separarPedidosDeTresEnTres() {
    let pedidos = this.filtrarPedidosVacios(this.dataService.comercial.pedidos);
    let arrayAux = []; 
    for(let i = 0; i < pedidos.length; i++) {
       arrayAux.push(pedidos[i]);
       if((i+1) % 3 == 0) {
        this.arrayPedidosDeTresEntres.push(arrayAux);
        arrayAux = [];
       }
    }
    this.arrayPedidosDeTresEntres.push(arrayAux);
    console.log(this.arrayPedidosDeTresEntres);
    
  }
  
  public filtrarPedidosVacios(pedidos) {
    let that = this;
      return pedidos.filter(function(pedido, index){
        return that.pedidoVacio(pedido);
      }) 
  }
  
  
  public pedidoVacio(pedido) {
      return (this.objetToArray(pedido.carrito.productos).length > 0);
  }
  
  public objetToArray(obj){
    let arr = [];
    for(let key in obj){
      if(obj[key].cantidadPedido > 0)
        arr.push(obj[key])
    }
    return arr;
  }
  
  public stringifi(str) { return JSON.stringify(str)}

}
