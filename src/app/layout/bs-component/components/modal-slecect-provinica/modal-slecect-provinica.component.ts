import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-modal-slecect-provinica',
    templateUrl: './modal-slecect-provinica.component.html',
    styleUrls: ['./modal-slecect-provinica.component.scss']
})
export class ModalSelectProvincia {
    closeResult: string;
    @Input() nombre_boton: string;
    @Input() bgClass;
    public prov;
    constructor(private modalService: NgbModal, public dataService: DataService) {
        
    }
    
    public changeProvinciaLocal(prov) {
        prov = '0000' + prov;
        this.prov = prov;
    }
    
    setProvincia() {
        localStorage.provincia = this.prov; 
        this.dataService.getProvincia();
    }
    
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
}
