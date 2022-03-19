import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor( private autenticacionServicio: AutenticacionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    const token = this.autenticacionServicio.token();

      console.log("Archivo Interceptor Service, el token no es nulo: ", token );
      const headers = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token )});


    return next.handle(headers);
  }


}
