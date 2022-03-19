import { Component, OnInit, Input } from '@angular/core';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;

 // @Input() imagen: string = "";
 // @Input() titulo: string = "";
 //@Input() descripcion: string = "";
 // @Input() link: string = "";


  constructor(public datosPortafolio: PortafolioService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosProyectos().subscribe(data => {
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
