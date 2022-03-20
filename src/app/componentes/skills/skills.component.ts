import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  form: FormGroup;



  constructor(public datosPortafolio: PortafolioService, private formBuilder: FormBuilder) {
    this.form=this.formBuilder.group({
      descripcion: [ '', [Validators.required, Validators.minLength(2)]],
      imagen: ['', [Validators.required, Validators.minLength(2)]],
      tecnologia: ['', [Validators.required, Validators.minLength(2)]],

    })
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosSkills().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log(data);
    })
  }

  onCrear(event: Event){
    this.modoNuevoRegistro=true;
  }

  onEdit(i: any, event: Event ){
    this.modoEdicion=true;
    event.preventDefault;
    this.datosPortafolio.putSkill(this.form.value, this.form.value[i].id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("SKILL method PUT Data Editada", data);
    });
  }

  onSaveNew(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postSkill(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("SKILL method POST Data Enviada", data);
    this.modoEdicion=false;
    //this.ruta.navigate(['/portafolio']);
    });
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postSkill(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("SKILL method POST Data Enviada", data);
    this.modoNuevoRegistro=false;
    //this.ruta.navigate(['/portafolio']);
    });
  }


  onCancelNuevoRegistro(){
    this.modoNuevoRegistro=false;
  }


  onCancel(i: any, event: Event){
    this.modoEdicion=false;
  }

  onDelete( i: any, event: Event ){
    this.modoEdicion=false;
    event.preventDefault;
    this.datosPortafolio.deleteSkill(this.miPortafolio[i].id).subscribe(data => {
    console.log("Borrando registro", data);
    });
  }



}
