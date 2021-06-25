import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/ClaseEstudiantes/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  constructor(private http: HttpClient) { }

  getAsistencias(id: number): Observable<any>{
    return this.http.get(AUTH_API + 'Clase/' + id, httpOptions);
  }

  postAsistencias(estudiantesId: number, clasesId: number, asiste:boolean): Observable<any>{
    return this.http.post(AUTH_API, {
      estudiantesId,
      clasesId,
      asiste
    }, httpOptions);
  }
  putAsistencias(id: number, estudiantesId: number, clasesId: number, asiste:boolean): Observable<any>{
    return this.http.put(AUTH_API + id , {
      id,
      estudiantesId,
      clasesId,
      asiste
    }, httpOptions);
  }
}