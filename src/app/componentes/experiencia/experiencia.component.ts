import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import { IExperiencia } from '../../interfaces/iexperiencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miPortafolio: any;
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
    this.datosPortafolio.obtenerDatosExperiencias().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log(data);
    })
  }

  onEdit(id: any, event: Event ){
    this.modoEdicion=true;

    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);
  }


  onCrear(event: Event){
    this.modoNuevoRegistro=true;
  }


  onSaveEdit( id: any, i:number, event: Event ){
    event.preventDefault;
    this.datosPortafolio.putExperiencia(this.form.value, id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , id);
      console.log("EXPERIENCIA method PUT Data Editada", data);

      this.datosPortafolio.obtenerOneDatosExperiencia(id).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.miPortafolio[i]=data;
        console.log("miPortafolio[i : ", this.miPortafolio[i]);
      });

    });
    this.modoEdicion = false;
  }


  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postExperiencia(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("EXPERIENCIA method POST Data Enviada", data);

    this.datosPortafolio.obtenerDatosExperiencias().subscribe(data => {
      this.miPortafolio=data;
    });

    });

    this.modoNuevoRegistro=false;

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
    Swal.fire({
      title: '¿ELIMINAR ITEM EXPERIENCIA?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteExperiencia(this.miPortafolio[i].id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosExperiencias().subscribe(data => {
            this.miPortafolio=data;
          });

          });

        Swal.fire({
          title: 'ITEM ELIMINADO',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  }

}
