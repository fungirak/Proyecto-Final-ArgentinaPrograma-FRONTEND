import { Component, OnInit, Input } from '@angular/core';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;


  // @Input() fullname: string = "" ;
  // @Input() posicion: string = "" ;
  // @Input() descripcion1: string = "" ;
  // @Input() descripcion2: string = "" ;
  // @Input() descripcion3: string = "" ;
  // @Input() acercade: string[] =  [
  //                              "GABRIEL LAZZARINI",
  //                              "FULL STACK DEVELOPER JR.",
  //                              "Estudiante Universitario de Ingeniería en Informática en la Universidad Nacional Del Litoral.",
  //                              "Técnico en Informática Profesional y Personal.",
  //                              "Programador Full Stack Jr."
  //                              ];


  constructor(public datosPortafolio: PortafolioService)  { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data[0];
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
