import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/CalificacionEstudiantes/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  constructor(private http: HttpClient) { }

  // getEstudiantes(): Observable<any> {
  //   return this.http.get(AUTH_API , httpOptions);
  // }



  getCalificaciones(id: number): Observable<any>{
    return this.http.get(AUTH_API + 'Calificacion/' + id, httpOptions);
  }

  postCalificaciones(estudiantesId: number, calificacionesId: number, nota: number): Observable<any>{
    return this.http.post(AUTH_API, {
      estudiantesId,
      calificacionesId,
      nota
    }, httpOptions);
  }
  putCalificaciones(id: number, estudiantesId: number, calificacionesId: number, nota: number): Observable<any>{
    return this.http.put(AUTH_API + id, {
      id,
      estudiantesId,
      calificacionesId,
      nota
    }, httpOptions);
  }

  // editarEstudiante(id: string, documento: string, primerApellido: string, segundoApellido: string,
  //   primerNombre: string, segundoNombre: string, fechaNacimiento: string): Observable<any> {
  //   return this.http.put(AUTH_API + id, {
  //     id,
  //     documento,
  //     primerApellido,
  //     segundoApellido,
  //     primerNombre,
  //     segundoNombre,
  //     fechaNacimiento
  //   }, httpOptions);
  // }

  // borrarEstudiante(id: number): Observable<any>{
  //   return this.http.delete(AUTH_API + id, httpOptions);
  // }

  // getEstudiante(id:number): Observable<any>{
  //   return this.http.get(AUTH_API + id, httpOptions);
  // }

}