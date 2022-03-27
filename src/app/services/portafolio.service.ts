import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from '../interfaces/iskill';
import { IAcercaDe } from '../interfaces/iacercade';
import { IEducacion } from '../interfaces/ieducacion';
import { IExperiencia } from '../interfaces/iexperiencia';
import { IProyecto } from '../interfaces/iproyecto';


@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  url = "https://argentina-programa-portafolio.herokuapp.com/api/v1/";

  // Headers para POST, PUT Y DELETE.
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' });


  constructor(private http:HttpClient) { }

  // *********************************************************************
  // **************   |   METHOD'S GET ALL    | **************************
  // *********************************************************************

  obtenerDatosAcercaDe():Observable<any> {
    return this.http.get<any>( this.url + 'acerca_de' );
  }

  obtenerDatosEducacion():Observable<IEducacion> {
    return this.http.get<IEducacion>( this.url + 'educacion');
  }


  obtenerDatosExperiencias():Observable<IExperiencia> {
    return this.http.get<IExperiencia>( this.url + 'experiencias');
  }

  obtenerDatosProyectos():Observable<IProyecto> {
    return this.http.get<IProyecto>( this.url + 'proyectos');
  }

  obtenerDatosSkills():Observable<ISkill> {
    return this.http.get<ISkill>( this.url + 'skills');
  }

  // *********************************************************************
  // **************   |   METHOD'S GET ONE    | **************************
  // *********************************************************************

  obtenerOneDatosAcercaDe(id: number):Observable<any> {
    return this.http.get<any>( this.url + 'acerca_de/' + id );
  }

  obtenerOneDatosEducacion(id: number):Observable<IEducacion> {
    return this.http.get<IEducacion>( this.url + 'educacion/' + id);
  }

  obtenerOneDatosExperiencia(id: number):Observable<IExperiencia> {
    return this.http.get<IExperiencia>( this.url + 'experiencias/' + id);
  }

  obtenerOneDatosProyecto(id: number):Observable<IProyecto> {
    return this.http.get<IProyecto>( this.url + 'proyectos/' + id);
  }

  obtenerOneDatosSkill(id: number):Observable<ISkill> {
    return this.http.get<ISkill>( this.url + 'skills/' + id);
  }



  // *********************************************************************
  // **************   |   METHOD'S POST    | ******************************
  // *********************************************************************

  postAcercaDe( AcercaDe: any ):Observable<any> {
    let AcercaDeJSON = JSON.stringify(AcercaDe);
    return this.http.post<any>( this.url + 'acerca_de', AcercaDeJSON , { headers: this.headers} );
  }

  postEducacion( Educacion: IEducacion ):Observable<IEducacion> {
    return this.http.post<IEducacion>( this.url + 'educacion', Educacion , { headers: this.headers} );
  }

  postExperiencia( Experiencia: IExperiencia ):Observable<IExperiencia> {
    return this.http.post<IExperiencia>( this.url + 'experiencias', Experiencia , { headers: this.headers} );
  }

  postProyecto( Proyecto: IProyecto ):Observable<IProyecto> {
    return this.http.post<IProyecto>( this.url + 'proyectos', Proyecto , { headers: this.headers} );
  }

  postSkill( Skill: ISkill ):Observable<ISkill> {
    return this.http.post<ISkill>( this.url + 'skills', Skill , { headers: this.headers} );
  }

  // *********************************************************************
  // **************   |   METHOD'S PUT    | ******************************
  // *********************************************************************

  putAcercaDe( AcercaDe: any, id: Number ):Observable<any> {
    return this.http.put<any>( this.url + 'acerca_de/' + id, AcercaDe , { headers: this.headers} );
  }

  putExperiencia( Experiencia: IExperiencia, i: Number  ):Observable<IExperiencia> {
    return this.http.put<IExperiencia>( this.url + 'experiencias/' + i, Experiencia , { headers: this.headers} );
  }

  putEducacion( Educacion: IEducacion, id: Number  ):Observable<IEducacion> {
    return this.http.put<IEducacion>( this.url + 'educacion/' + id, Educacion , { headers: this.headers} );
  }

  putProyecto( Proyecto: IProyecto, id: Number  ):Observable<IProyecto> {
    return this.http.put<IProyecto>( this.url + 'proyectos/' + id, Proyecto , { headers: this.headers} );
  }

  putSkill( Skill: ISkill, id: Number  ):Observable<ISkill> {
    return this.http.put<ISkill>( this.url + 'skills/' + id, Skill , { headers: this.headers} );
  }


  // *********************************************************************
  // **************   |   METHOD'S DELETE    | ***************************
  // *********************************************************************

  deleteAcercaDe( id: Number ):Observable<any> {
    return this.http.delete<any>( this.url + 'acerca_de/' + id , { headers: this.headers} );
  }

  deleteEducacion( id: Number ):Observable<IEducacion> {
    return this.http.delete<IEducacion>( this.url + 'educacion/' + id , { headers: this.headers} );
  }

  deleteExperiencia( id: Number ):Observable<IExperiencia> {
    return this.http.delete<IExperiencia>( this.url + 'experiencias/' + id ,  { headers: this.headers} );
  }

  deleteProyecto( id: Number ):Observable<IProyecto> {
    return this.http.delete<IProyecto>( this.url + 'proyectos/' + id ,  { headers: this.headers} );
  }

  deleteSkill( id: Number ):Observable<ISkill> {
    return this.http.delete<ISkill>( this.url + 'skills/' + id ,  { headers: this.headers} );
  }


}
