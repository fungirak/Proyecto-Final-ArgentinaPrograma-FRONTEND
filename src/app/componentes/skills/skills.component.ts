import { Component, OnInit, Input } from '@angular/core';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;

  //@Input() color: string = "" ;
  //@Input() skill: string = "" ;


  constructor(public datosPortafolio: PortafolioService) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosSkills().subscribe(data => {
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
