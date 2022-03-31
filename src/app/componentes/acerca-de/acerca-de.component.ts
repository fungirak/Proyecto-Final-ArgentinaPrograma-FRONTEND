import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import Swal from 'sweetalert2';
import { IAcercaDe } from 'src/app/interfaces/iacercade';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPortafolio: any ;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  form: FormGroup;
  alertaDelete: string = "¿Eliminar información AcercaDe?"



  constructor(public datosPortafolio: PortafolioService, private formBuilder: FormBuilder)  {
    this.form= new FormGroup({
      fullname: new FormControl([ '', [Validators.required, Validators.minLength(2)]]),
      posicion: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
      descripcion: new FormControl(['', [Validators.required, Validators.minLength(2)]])
    })
   }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
      this.miPortafolio=data[0];
      console.log("mi porta", this.miPortafolio)
      if(this.miPortafolio===undefined){
        this.datosPortafolio.postAcercaDe(this.form.value).subscribe(data => {
          console.log(data);
        });

      this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
        this.miPortafolio=data[0];
      });

      }
    })
  }

  onCrear(event: Event){
    this.modoNuevoRegistro=true;

  }


  onEdit(id: any, event: Event ){

    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
     fullname: this.miPortafolio.fullname,
      posicion: this.miPortafolio.posicion,
      descripcion: this.miPortafolio.descripcion
    })

    console.log("this.form.value: " , this.form.value);



    this.modoEdicion = true;
  }

  onSaveEdit( id: any, event: Event ){
    event.preventDefault;
    this.datosPortafolio.putAcercaDe(this.form.value, id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method PUT Data", data);

      this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
        this.miPortafolio=data[0];
      });

    this.modoEdicion=false;
    });
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postAcercaDe(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    this.modoNuevoRegistro=false;
    });

    this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
      this.miPortafolio=data;
    });
  }

  onDelete(id: any,event: Event ){
    this.modoEdicion=false;
    event.preventDefault;
    Swal.fire({
      title: '¿Desea Eliminar la información Acerca De?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ELIMINAR'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteAcercaDe(id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosAcercaDe().subscribe(data => {
            this.miPortafolio=data;
          });

          });


        Swal.fire(
          'ELIMINADO',
          'La Información Acerca De ha sido eliminada con éxito.',
          'success'
        )
      }
    })

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

    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );
    console.log("valueFormInstitucion: ", valueForms[2].value );

    this.modoEdicion= false;

  }

}
