import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  url = "http://localhost:8080/api/v1/";


  constructor(private http:HttpClient) { }

  obtenerDatosAcercaDe():Observable<any> {
    console.log("******************** Inicio de la búsqueda de datos del usuario ***********************");
    return this.http.get<any>( this.url + 'acerca_de' );
  }

  obtenerDatosEducacion():Observable<any> {
    return this.http.get<any>( this.url + 'educacion');
  }

  obtenerDatosExperiencia():Observable<any> {
    return this.http.get<any>( this.url + 'experiencias');
  }

  obtenerDatosProyectos():Observable<any> {
    return this.http.get<any>( this.url + 'proyectos');
  }

  obtenerDatosSkills():Observable<any> {
    return this.http.get<any>( this.url + 'skills');
  }



}
