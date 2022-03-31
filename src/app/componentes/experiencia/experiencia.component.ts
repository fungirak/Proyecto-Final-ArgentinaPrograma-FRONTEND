import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
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
  i! : number ;
  editID! : number;
  form: FormGroup;





  constructor(public datosPortafolio: PortafolioService) {
    this.form= new FormGroup({
      empresa: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
      ubicacion: new FormControl( ['', [Validators.required, Validators.minLength(2)]]),
      puesto:  new FormControl(['', [Validators.required, Validators.minLength(2)]]),
      periodo:  new FormControl(['', [Validators.required, Validators.minLength(2)]]),
      actividades:  new FormControl(['', [Validators.required, Validators.minLength(2)]])

    })
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosExperiencias().subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log(data);
    })
  }

  onEdit(id: any, i: number, event: Event ){
    this.editID = id;
    this.i= i;
    console.log("i", i);
    console.log("editID", this.editID);
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
      actividades: this.miPortafolio[i].actividades,
      empresa: this.miPortafolio[i].empresa,
      periodo: this.miPortafolio[i].periodo,
      puesto: this.miPortafolio[i].puesto,
      ubicacion: this.miPortafolio[i].ubicacion
    })

    console.log("this.form.value: " , this.form.value);

    this.modoEdicion=true;
  }


  onCrear(event: Event){

    let objetoFormulario = this.form.controls;
    let keysForms =  Object.keys(objetoFormulario);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objetoFormulario);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');
    valueForms[2].setValue('');
    valueForms[3].setValue('');
    valueForms[4].setValue('');

    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );
    console.log("valueFormInstitucion: ", valueForms[2].value );
    console.log("valueFormPeriodo: ", valueForms[3].value );
    console.log("valueFormTitulo: ", valueForms[4].value );

    this.modoNuevoRegistro=true;
  }


  onSaveEdit( event: Event ){
    event.preventDefault;
    this.datosPortafolio.putExperiencia(this.form.value, this.editID).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.editID);
      console.log("EXPERIENCIA method PUT Data Editada", data);

      this.datosPortafolio.obtenerOneDatosExperiencia(this.editID).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.miPortafolio[this.i]=data;
        console.log("miPortafolio[i : ", this.miPortafolio[this.i]);
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


  onCancel(event: Event){

    let objetoFormulario = this.form.controls;
    let keysForms =  Object.keys(objetoFormulario);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objetoFormulario);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');
    valueForms[2].setValue('');
    valueForms[3].setValue('');
    valueForms[4].setValue('');

    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );
    console.log("valueFormInstitucion: ", valueForms[2].value );
    console.log("valueFormPeriodo: ", valueForms[3].value );
    console.log("valueFormTitulo: ", valueForms[4].value );

    this.modoEdicion=false;
  }


  onDelete( i: number, event: Event ){
    this.i = i;
    this.modoEdicion=false;
    event.preventDefault;
    Swal.fire({
      title:  `¿ELIMINAR EXPERIENCIA ${(this.miPortafolio[i].puesto).toUpperCase() }?`,
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#00b5ff',
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar'
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
