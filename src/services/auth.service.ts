import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/Authenticate/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get(AUTH_API + 'users', httpOptions);
  }

  getRole(username: string): Observable<any> {
    return this.http.get(AUTH_API + 'users-role?username=' + username , httpOptions);
  }
  
  getRoles(): Observable<any> {
    return this.http.get(AUTH_API + 'roles', httpOptions);
  }

  giveRole(username: string, role: string): Observable<any> {
    return this.http.post(AUTH_API + 'users-role', {
      username,
      role
    }, httpOptions);
  }

}