import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';

@Component({
    selector: 'app-modal-estadisticas',
    templateUrl: './modal-estadisticas.component.html',
    styleUrls: ['./modal-estadisticas.component.scss']
})
export class ModalEstadisticas {
    closeResult: string;
    @Input() nombre_boton: string;
    @Input() estadisticas;
    @Input() bgClass;
    constructor(private modalService: NgbModal, public dataService: DataService) { }

    
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    
    public toFixed (val) {
        return String(Number(val).toFixed(2) + "€");
    }
    
    public quitarHoraFecha(fecha) {
        return fecha.split(" ")[0]; 
    }
}
