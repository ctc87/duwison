import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpCalls } from '../../';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  

 
  constructor(public dataService : DataService, public httpService: HttpCalls) { }
  public isCollapsed = true;
 
    collapsar() {
        this.isCollapsed = !this.isCollapsed; 
    }
    
    public ngOnInit() {
        this.dataService.almacen = 1;
        console.log(this.dataService.familia_actual);
        let that = this;
        
        if(that.dataService.familia_actual.codfam == '-1') {
          this.dataService.arrayProductosFamilia = this.httpService.objetosJSON["productos"];
        }
        else {
          this.dataService.arrayProductosFamilia = this.httpService.objetosJSON["productos"].filter(function(element, index){
              //console.log(element.codfam, that.dataService.familia_actual.codfam)
              return Number(element.codfam) === Number(that.dataService.familia_actual.codfam) 
              // && Number(element.cod_almacen) === that.dataService.almacen;    
              // ESTO ES PARA ALMACEN DE TENERIFE
          });
        }
        
        // si cambiamos de cards a lista se mantiene el filtrado si no se renueva
        if(!this.dataService.filtrando) {
          this.dataService.arrayProductosFiltrados = this.dataService.arrayProductosFamilia;
          this.dataService.filtrado = "";
        }
        //console.log(this.dataService.clienteActualPedido.carrito.productos)
    }
    
    public filtrando(value: boolean) {
     this.dataService.filtrando = value; 
    }
    

}
