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
        
        
        this.dataService.arrayProductosFamilia = this.httpService.objetosJSON["productos"].filter(function(element, index){
            console.log(element.codfam, that.dataService.familia_actual.codfam)
            return Number(element.codfam) === Number(that.dataService.familia_actual.codfam) 
            // && Number(element.cod_almacen) === that.dataService.almacen;    
            // ESTO ES PARA ALMACEN DE TENERIFE
        });
        
        console.log(this.dataService.arrayProductosFamilia);
        this.dataService.arrayProductosFiltrados = this.dataService.arrayProductosFamilia;
        console.log(this.dataService.clienteActualPedido.carrito.productos)
    }
    

}
