import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/Clases/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private http: HttpClient) { }

  getClases(curso :string): Observable<any> {
    return this.http.get(AUTH_API + 'Cursos/' + curso , httpOptions);
  }

  createClases(titulo:string, fecha:string, descripcion: string, cursosId: number): Observable<any> {
    console.log("El titulo es: " + titulo + " La fecha es: " + fecha + " La descripcion es: " + descripcion + " El curso es: " + cursosId);
    return this.http.post(AUTH_API, {
        titulo,
        fecha,
        descripcion,
        cursosId
      }, httpOptions);
  }

  putClases(id :number, titulo: string, fecha: string, descripcion: string, cursosId: number): Observable<any> {
    console.log("El titulo es: " + id + " La fecha es: " + fecha + " La descripcion es: " + descripcion + " El curso es: " + cursosId);
    return this.http.put(AUTH_API + id, {
      id,
      titulo,
      fecha,
      descripcion,
      cursosId
    }, httpOptions);
  }

  deleteClases(id: number){
    return this.http.delete(AUTH_API + id,  httpOptions);
  }

}
