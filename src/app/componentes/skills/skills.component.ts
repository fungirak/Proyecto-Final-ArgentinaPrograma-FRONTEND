import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  modoEdicionArray: boolean[] = [];
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
    });

  }




  onCrear(event: Event){
    this.modoNuevoRegistro=true;
  }

  onEdit(id: any, event: Event ){
    this.modoEdicion=true;
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);
  }

  onSaveEdit( id: any, event: Event ){
    event.preventDefault;
    this.datosPortafolio.putSkill(this.form.value, id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , id);
      console.log("SKILL method PUT Data Editada", data);
    });
    this.modoEdicion=false;
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postSkill(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("SKILL method POST Data Enviada", data);
    this.modoNuevoRegistro=false;
    });

    this.datosPortafolio.obtenerDatosSkills().subscribe(data => {
      this.miPortafolio=data;
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
    Swal.fire({
      title: '¿ELIMINAR ITEM SKILL?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteSkill(this.miPortafolio[i].id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosSkills().subscribe(data => {
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
