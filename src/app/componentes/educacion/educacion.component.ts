import { Component, OnInit, Input } from '@angular/core';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;

 // @Input() institucion: string = "";
 // @Input() titulo: string = "";
 // @Input() periodo: string = "";
 // @Input() estado: string = "";
 // @Input() detalles: string = "";


  constructor(public datosPortafolio: PortafolioService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log(data);
    })
  }

  onEdit(){
    this.modoEdicion=true;
  }

  onSave(){
    this.modoEdicion=false;
  }

  onDelete(){
    this.modoEdicion=false;

  }

  onCancel(){
    this.modoEdicion=false;
  }


}
