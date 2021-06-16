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
export class EvaluacionesService {

  constructor(private http: HttpClient) { }

  getEvaluaciones(curso :string): Observable<any> {
    return this.http.get(AUTH_API + 'Cursos/' + curso , httpOptions);
  }

  postEvaluaciones(titulo :string, ponderacion: number, cursosId): Observable<any> {
    return this.http.post(AUTH_API, {
      titulo,
      ponderacion,
      cursosId
    }, httpOptions);
  }

  putEvaluaciones(id :number, titulo: string, ponderacion: number, cursosId: number): Observable<any> {
    console.log("El id es: " + id + " El titulo es: " + titulo + " La ponderacion es : "+ponderacion + " El curso es: " + cursosId)
    return this.http.put(AUTH_API + id, {
      id,
      titulo,
      ponderacion,
      cursosId
    }, httpOptions);
  }


  deleteCalif(id: number){
    return this.http.delete(AUTH_API + id,  httpOptions);
  }
}
