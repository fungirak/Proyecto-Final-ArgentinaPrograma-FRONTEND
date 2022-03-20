import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  form: FormGroup;




  constructor(public datosPortafolio: PortafolioService, private formBuilder: FormBuilder) {
    this.form=this.formBuilder.group({
      empresa: [ '', [Validators.required, Validators.minLength(2)]],
      ubicacion: ['', [Validators.required, Validators.minLength(2)]],
      puesto: ['', [Validators.required, Validators.minLength(2)]],
      periodo: ['', [Validators.required, Validators.minLength(2)]],
      actividades: ['', [Validators.required, Validators.minLength(2)]]

    })
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosExperiencia().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log(data);
    })
  }

  onEdit(i: any, event: Event ){
    this.modoEdicion=true;
    event.preventDefault;
    this.datosPortafolio.putExperiencia(this.form.value, this.form.value[i].id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("EXPERIENCIA method PUT Data Editada", data);
    });
  }


  onCrear(event: Event){
    this.modoNuevoRegistro=true;
  }


  onSaveNew(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postExperiencia(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("EXPERIENCIA method POST Data Enviada", data);
    this.modoEdicion=false;
    //this.ruta.navigate(['/portafolio']);
    });
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postExperiencia(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("EXPERIENCIA method POST Data Enviada", data);
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
    console.log("sacar id del item a eliminar: ", this.miPortafolio);
    this.datosPortafolio.deleteExperiencia(this.miPortafolio[i].id).subscribe(data => {
    console.log("Borrando registro", data);
    });
  }

}
