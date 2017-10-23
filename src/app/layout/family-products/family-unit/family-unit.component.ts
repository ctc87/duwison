import { Component, Input, OnInit} from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-family-unit',
  templateUrl: './family-unit.component.html',
  styleUrls: ['./family-unit.component.css']
})
export class FamilyUnitComponent implements OnInit{
 
 
  // La ruta a la imágen de la familia
 @Input() img_src: string;
 // El nombre de la familia
 @Input() name: string;

 constructor(public dataService: DataService) {
  
   // this.dataService.familia_actual.subscribe(message => this.name = message)
 } 
 ngOnInit() {
   // this.dataService.familia_actual.subscribe(message => this.name = message);
  }
  

 
  newMessage() {
     this.dataService.cambiarFamilia(this.name)
   }
 
 seleccionarFamilia() {
  this.newMessage();
 };
 
  
}
