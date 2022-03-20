import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  form: FormGroup;



  constructor(public datosPortafolio: PortafolioService, private formBuilder: FormBuilder) {
    this.form=this.formBuilder.group({
     detalles: [ '', [Validators.required, Validators.minLength(2)]],
     estado: ['', [Validators.required, Validators.minLength(2)]],
     institucion: ['', [Validators.required, Validators.minLength(2)]],
     periodo: ['', [Validators.required, Validators.minLength(2)]],
     titulo: ['', [Validators.required, Validators.minLength(2)]]

    })
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log(data);
    });

  }


  onCrear(event: Event){
    this.modoNuevoRegistro=true;

  }


  onEdit(i: any, event: Event ){
    this.modoEdicion=true;
    event.preventDefault;
    this.datosPortafolio.putEducacion(this.form.value, this.form.value[i].id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    });
  }

  onSaveNew(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postEducacion(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    this.modoNuevoRegistro=false;
    //this.ruta.navigate(['/portafolio']);
    });
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postEducacion(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    this.modoNuevoRegistro=false;
    //this.ruta.navigate(['/portafolio']);
    });
  }

  onDelete(  i: any, event: Event ){
    this.modoEdicion=false;
    event.preventDefault;
    this.datosPortafolio.deleteEducacion(this.miPortafolio[i].id).subscribe(data => {
    console.log("Borrando registro", data);
    });



  }

  onCancelNuevoRegistro(){
    this.modoNuevoRegistro=false;
  }

  onCancel(i: any, event: Event){
    this.modoEdicion=false;
  }


}
