/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;


  constructor( private formBuilder: FormBuilder, private autenticacionService: AutenticacionService, private ruta:Router) {
    this.form=this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {

  }


  get nombre (){
    return this.form.get('nombre')
  }

  get nombreUsuario (){
    return this.form.get('nombreUsuario')
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }


  onRegister(event:Event ){
    event.preventDefault;
    this.autenticacionService.register(this.form.value).subscribe(data => {
    console.log("Archivo Register Component: ", data);
    //sessionStorage.setItem('token', data.token);
    //this.autenticacionService.setToken(data.token);
    this.ruta.navigate(['/login']);
    });
   }
}
*/
