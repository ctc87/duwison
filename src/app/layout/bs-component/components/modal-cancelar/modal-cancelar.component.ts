import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../../shared/services/data.service';

@Component({
    selector: 'app-modal-cancelar',
    templateUrl: './modal-cancelar.component.html',
    styleUrls: ['./modal-cancelar.component.scss']
})
export class ModalCancelar {
    closeResult: string;
    @Input() nombre_boton: string;
    @Input() index: number;
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
    
    cancelarPedido() {
     this.dataService.clients.splice(this.index,1);   
    }
}
