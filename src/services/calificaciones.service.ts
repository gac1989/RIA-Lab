import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/Calificaciones/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  constructor(private http: HttpClient) { }

  getCalificaciones(curso :string): Observable<any> {
    return this.http.get(AUTH_API + 'Cursos/' + curso , httpOptions);
  }

  postCalificaciones(titulo :string, ponderacion: number, cursosId): Observable<any> {
    return this.http.post(AUTH_API, {
      titulo,
      ponderacion,
      cursosId
    }, httpOptions);
  }
}
