import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  modoNuevoRegistro: boolean = false;
  i! : number ;
  editID! : number;
  form: FormGroup;



  constructor(public datosPortafolio: PortafolioService) {
    this.form= new FormGroup ({
      imagen: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
      tecnologia: new FormControl(['', [Validators.required, Validators.minLength(2)]]),
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
    let objetoFormulario = this.form.controls;
    let keysForms =  Object.keys(objetoFormulario);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objetoFormulario);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');


    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );

    this.modoNuevoRegistro=true;
  }

  onEdit(id: number, i:number, event: Event ){
    this.editID = id;
    this.i= i;
    console.log("i", i);
    console.log("editID", this.editID);
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
      imagen: this.miPortafolio[i].imagen,
      tecnologia: this.miPortafolio[i].tecnologia
    })

    console.log("this.form.value: " , this.form.value);

    this.modoEdicion=true;

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
    let objetoFormulario = this.form.controls;
    let keysForms =  Object.keys(objetoFormulario);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objetoFormulario);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');


    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );

    this.modoEdicion=false;
  }


  onDelete( i: any, event: Event ){
    this.i = i;
    this.modoEdicion=false;
    event.preventDefault;
    Swal.fire({
      title: `¿ELIMINAR SKILL ${(this.miPortafolio[i].tecnologia).toUpperCase() }?`,
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
