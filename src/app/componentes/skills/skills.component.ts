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
  i! : number ;
  editID! : number;
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

  onEdit(id: number, i:number, event: Event ){
    this.editID = id;
    this.i= i;
    console.log("i", i);
    console.log("editID", this.editID);
    this.modoEdicion=true;
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);
  }


  onSaveEdit( event: Event ){
    event.preventDefault;
    this.datosPortafolio.putSkill(this.form.value, this.editID).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.editID);
      console.log("SKILL method PUT Data Editada", data);

      this.datosPortafolio.obtenerOneDatosSkill(this.editID).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.miPortafolio[this.i]=data;
        console.log("miPortafolio[i : ", this.miPortafolio[this.i]);
      });

    });
    this.modoEdicion = false;
  }



  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postSkill(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("SKILL method POST Data Enviada", data);

      this.datosPortafolio.obtenerDatosSkills().subscribe(data => {
        this.miPortafolio=data;
      });
    });

    this.modoNuevoRegistro=false;
  }


  onCancelNuevoRegistro(){
    this.modoNuevoRegistro=false;
  }


  onCancel(event: Event){
    this.modoEdicion=false;
  }


  onDelete( i: any, event: Event ){
    this.i = i;
    this.modoEdicion=false;
    event.preventDefault;
    Swal.fire({
      title: '¿ELIMINAR ITEM SKILL?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#00b5ff',
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar'
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
