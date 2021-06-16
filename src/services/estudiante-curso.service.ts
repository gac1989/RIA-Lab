import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/EstudiantesCursos/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EstudianteCursoService {

  constructor(private http: HttpClient) { }

  // getEstudiantes(): Observable<any> {
  //   return this.http.get(AUTH_API , httpOptions);
  // }

  agregarEstCurso(estudianteId: number, cursoId: number): Observable<any> {
    return this.http.post(AUTH_API, {
      estudianteId,
      cursoId
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