import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAcercaDe } from '../interfaces/iacercade';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  url = "https://proyecto-final-arg-prog.herokuapp.com/api/v1/";

  // Headers para POST, PUT Y DELETE.
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' });


  constructor(private http:HttpClient) { }

  // *********************************************************************
  // **************   |   METHOD'S GET    | ******************************
  // *********************************************************************

  obtenerDatosAcercaDe():Observable<any> {
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

  // *********************************************************************
  // **************   |   METHOD'S POST    | ******************************
  // *********************************************************************

  postAcercaDe( AcercaDe: IAcercaDe ):Observable<IAcercaDe> {
    let AcercaDeJSON = JSON.stringify(AcercaDe);
    return this.http.post<IAcercaDe>( this.url + 'acerca_de', AcercaDeJSON , { headers: this.headers} );
  }

  postEducacion( Educacion: any ):Observable<any> {
    return this.http.post<any>( this.url + 'educacion', Educacion , { headers: this.headers} );
  }

  postExperiencia( Experiencia: any ):Observable<any> {
    return this.http.post<any>( this.url + 'experiencias', Experiencia , { headers: this.headers} );
  }

  postProyecto( Proyecto: any ):Observable<any> {
    return this.http.post<any>( this.url + 'proyectos', Proyecto , { headers: this.headers} );
  }

  postSkill( Skill: any ):Observable<any> {
    return this.http.post<any>( this.url + 'skills', Skill , { headers: this.headers} );
  }

  // *********************************************************************
  // **************   |   METHOD'S PUT    | ******************************
  // *********************************************************************

  putAcercaDe( AcercaDe: any, id: Number ):Observable<any> {
    return this.http.put<any>( this.url + 'acerca_de/' + id, AcercaDe , { headers: this.headers} );
  }

  putExperiencia( Experiencia: any, i: Number  ):Observable<any> {
    return this.http.put<any>( this.url + 'experiencias/' + i, Experiencia , { headers: this.headers} );
  }

  putEducacion( Educacion: any, id: Number  ):Observable<any> {
    return this.http.put<any>( this.url + 'educacion/' + id, Educacion , { headers: this.headers} );
  }

  putProyecto( Proyecto: any, id: Number  ):Observable<any> {
    return this.http.put<any>( this.url + 'proyectos/' + id, Proyecto , { headers: this.headers} );
  }

  putSkill( Skill: any, id: Number  ):Observable<any> {
    return this.http.put<any>( this.url + 'skills/' + id, Skill , { headers: this.headers} );
  }


  // *********************************************************************
  // **************   |   METHOD'S DELETE    | ***************************
  // *********************************************************************

  deleteAcercaDe( id: Number ):Observable<any> {
    return this.http.delete<any>( this.url + 'acerca_de/' + id , { headers: this.headers} );
  }

  deleteEducacion( id: Number ):Observable<any> {
    return this.http.delete<any>( this.url + 'educacion/' + id , { headers: this.headers} );
  }

  deleteExperiencia( id: Number ):Observable<any> {
    return this.http.delete<any>( this.url + 'experiencias/' + id ,  { headers: this.headers} );
  }

  deleteProyecto( id: Number ):Observable<any> {
    return this.http.delete<any>( this.url + 'proyectos/' + id ,  { headers: this.headers} );
  }

  deleteSkill( id: Number ):Observable<any> {
    return this.http.delete<any>( this.url + 'skills/' + id ,  { headers: this.headers} );
  }


}
