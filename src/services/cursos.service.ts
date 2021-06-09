import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/Cursos/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  getCursos(): Observable<any> {
    return this.http.get(AUTH_API , httpOptions);
  }

  crearCurso(nombre: string, descripcion: string, programa: string, userId: string): Observable<any> {
    return this.http.post(AUTH_API, {
      nombre,
      descripcion,
      programa,
      userId
    }, httpOptions);
  }

  editarCurso(id: number, nombre: string, descripcion: string, programa: string, docenteId: string): Observable<any> {
    return this.http.put(AUTH_API + id, {
      id,
      nombre,
      descripcion,
      programa,
      docenteId
    }, httpOptions);
  }
  borrarCurso(id: number): Observable<any>{
    return this.http.delete(AUTH_API + id, httpOptions);
  }

  getCurso(id:number): Observable<any>{
    return this.http.get(AUTH_API + id, httpOptions);
  }

}
