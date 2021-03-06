import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/Estudiantes/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<any> {
    return this.http.get(AUTH_API , httpOptions);
  }

  crearEstudiante(documento: string, primerApellido: string, segundoApellido: string,
                  primerNombre: string, segundoNombre: string, fechaNacimiento: string): Observable<any> {
    return this.http.post(AUTH_API, {
      documento,
      primerApellido,
      segundoApellido,
      primerNombre,
      segundoNombre,
      fechaNacimiento
      }, httpOptions);
  }

  editarEstudiante(id: string, documento: string, primerApellido: string, segundoApellido: string,
    primerNombre: string, segundoNombre: string, fechaNacimiento: string): Observable<any> {
    return this.http.put(AUTH_API + id, {
      id,
      documento,
      primerApellido,
      segundoApellido,
      primerNombre,
      segundoNombre,
      fechaNacimiento
    }, httpOptions);
  }

  borrarEstudiante(id: number): Observable<any>{
    return this.http.delete(AUTH_API + id, httpOptions);
  }

  getEstudiante(id:number): Observable<any>{
    return this.http.get(AUTH_API + id, httpOptions);
  }

  getEstudiantesPag(size: number, index: number, nombre: string, apellido: string, documento: string): Observable<any>{
    let ruta = AUTH_API + 'api/Estudiantes/Paging' + '?size=' + size + '&index=' + index;
    if(documento){
      ruta= ruta + "&documento=" + documento;
    }
    if(nombre){
      ruta= ruta + "&nombre=" + nombre;
    }
    if(apellido){
      ruta= ruta + "&apellido=" + apellido;
    }
    if(documento && nombre){
      ruta= ruta +  "&nombre=" + nombre + "&documento=" + documento;
    }
    if(documento && apellido){
      ruta= ruta +  "&apellidoe=" + apellido + "&documento=" + documento;
    }
    if(nombre && apellido){
      ruta= ruta +  "&nombre=" + nombre + "&apellido=" + apellido;
    }
    if(nombre && apellido && documento){
      ruta= ruta +  "&nombre=" + nombre + "&apellido=" + apellido + "&documento=" + documento;
    }
    return this.http.get(ruta, httpOptions);
  }
}
