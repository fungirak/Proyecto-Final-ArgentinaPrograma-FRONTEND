import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  form: FormGroup;



  constructor(public datosPortafolio: PortafolioService, private formBuilder: FormBuilder)  {
    this.form=this.formBuilder.group({
      fullname: [ '', [Validators.required, Validators.minLength(2)]],
      posicion: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(2)]]

    })
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data[0];
      console.log(data);
    })
  }


  onCrear(event: Event){
    this.modoEdicion=true;

  }


  onEdit( event: Event){
    this.modoEdicion=true;
    event.preventDefault;
    this.datosPortafolio.putAcercaDe(this.form.value, this.form.value.id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    });
  }

  onSaveNew(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postAcercaDe(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    this.modoEdicion=false;
    //this.ruta.navigate(['/portafolio']);
    });
  }

  onDelete(event: Event ){
    this.modoEdicion=false;
    event.preventDefault;
    this.datosPortafolio.deleteAcercaDe(this.miPortafolio.id).subscribe(data => {
    console.log("Borrando registro", data);
    });



  }

  onCancel(){
    this.modoEdicion=false;
  }

}
