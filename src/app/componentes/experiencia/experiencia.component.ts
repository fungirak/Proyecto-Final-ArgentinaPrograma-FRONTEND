import { Component, OnInit, Input } from '@angular/core';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;

  //@Input() empresa: string = "";
  //@Input() ubicacion: string = "";
  //@Input() puesto: string = "";
  //@Input() periodo: string = "";
  //@Input() actividades: string = "";

  constructor(public datosPortafolio: PortafolioService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosExperiencia().subscribe(data => {
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
