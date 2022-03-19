import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url="http://localhost:8080/auth/login";
  usuario: BehaviorSubject<any>;


  constructor(private http:HttpClient) {
    console.log("El servicio de autenticación está corriendo.");
    this.usuario = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token') || '{}'));
  }

  login(credenciales:any):Observable<any>{
    return this.http.post(this.url , credenciales);
   /* return this.http.post(this.url, credenciales).pipe(map(data => {
      console.log("Archivo Autenticacion Service , credenciales: ", credenciales);
      console.log("Archivo Autenticacion Service , mapeo de data: ", data);
      this.usuario.next(data);
      return data;
    }))
    */
  }

  token(){
    console.log("Archivo Autenticacion Service, token(): ", sessionStorage.getItem('token') );
    return  sessionStorage.getItem('token');
  }

  setToken(token:string): void {
    sessionStorage.setItem('token', token);
  }


}
