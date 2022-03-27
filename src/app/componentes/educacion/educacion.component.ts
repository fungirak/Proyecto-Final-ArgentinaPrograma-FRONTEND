import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import Swal from 'sweetalert2';
import { IEducacion } from 'src/app/interfaces/ieducacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  i! : number ;
  editID! : number;
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
      console.log("data: ",data);
      console.log("miPortafolio", this.miPortafolio);
    });
  }




  onCrear(event: Event){
    this.modoNuevoRegistro=true;

  }


  onEdit(id: any, i: number,  event: Event ){
    this.editID = id;
    this.i= i;
    console.log("i", i);
    console.log("editID", this.editID);
    this.modoEdicion= true;
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);
  }



  onSaveEdit( event: Event ){
    event.preventDefault;
    this.datosPortafolio.putEducacion(this.form.value, this.editID).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.editID);
      console.log("EDUCACIÓN method PUT Data Editada", data);

      this.datosPortafolio.obtenerOneDatosEducacion(this.editID).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.miPortafolio[this.i]=data;
        console.log("miPortafolio[i : ", this.miPortafolio[this.i]);
      });

    });
    this.modoEdicion = false;

  }



  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postEducacion(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);

      this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
        this.miPortafolio=data;
      });
    });

    this.modoNuevoRegistro=false;
  }



  onDelete( i:number, event: Event ){
    this.i = i;
    this.modoEdicion = false;
    event.preventDefault;
    Swal.fire({
      title: '¿ELIMINAR ITEM EDUCACIÓN?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#00b5ff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteEducacion(this.miPortafolio[i].id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosEducacion().subscribe(data => {
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



  onCancelNuevoRegistro(){
    this.modoNuevoRegistro=false;
  }



  onCancel(event: Event){

    this.modoEdicion= false;
  }


}
