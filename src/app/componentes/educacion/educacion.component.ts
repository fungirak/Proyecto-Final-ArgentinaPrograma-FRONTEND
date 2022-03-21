import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import Swal from 'sweetalert2';

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
    for(let i = 0; i < 100 ; i++) {
      this.modoEdicion = false ;
    }
   }


  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log("data: ",data);
      console.log("miPortafolio", this.miPortafolio);
    });
  }




  onCrear(event: Event){
    this.modoNuevoRegistro=true;

  }


  onEdit(id: any, event: Event ){
    this.modoEdicion= true;
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);
  }

  onSaveEdit( id: any, event: Event ){
    event.preventDefault;
    this.datosPortafolio.putEducacion(this.form.value, id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , id);
      console.log("EDUCACIÓN method PUT Data Editada", data);
    });
    this.modoEdicion = false;
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postEducacion(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    this.modoNuevoRegistro=false;
    });

    this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
      this.miPortafolio=data;
    });
  }

  onDelete(  i: any, event: Event ){
    this.modoEdicion = false;
    event.preventDefault;
    Swal.fire({
      title: '¿Desea Eliminar el item de Educación?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteEducacion(this.miPortafolio[i].id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
            this.miPortafolio=data;
          });

          });
        Swal.fire(
          'ELIMINADO',
          'Item Educación eliminado con éxito.',
          'success'
        )
      }
    })
  }

  onCancelNuevoRegistro(){
    this.modoNuevoRegistro=false;
  }

  onCancel(i: any, event: Event){
    this.modoEdicion= false;
  }


}
