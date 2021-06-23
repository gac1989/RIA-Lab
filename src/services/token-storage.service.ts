import { Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'auth-token';
const ROLE_NAME = 'role';
const USER_NAME = '';
const USER_ID = '';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private authService: AuthService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);

  }

  public saveRoleName(rol: string): void {
    window.sessionStorage.removeItem(ROLE_NAME);
    window.sessionStorage.setItem(ROLE_NAME, rol);
  }

  public getRoleName(): string {
    return window.sessionStorage.getItem(ROLE_NAME);
        
  }

  public saveUserName(username: string): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public getUserName(): string | null {
    return window.sessionStorage.getItem(USER_NAME);
  }

  public saveUserId(id: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id);
  }

  public getUserId(): string | null {
    return window.sessionStorage.getItem(USER_ID);
  }
  
  public async checkRole(): Promise<string | void> {
    return await this.authService.getUserInfo().toPromise().then(
      data => {
        let rol: string = "";
        if (data.roles[0] == "ADMIN" || data.roles[1] == "ADMIN") {
          rol += "ADMIN";
          console.log("ADMINNN");
        }
        if (data.roles[0] == "DOCENTE" || data.roles[1] == "DOCENTE") {
          rol += "DOCENTE";
          console.log("DOCENTE");
        }
        if (rol === "")
          rol = "NO ROL";

        this.saveRoleName(rol);
        return rol;
      })
      .catch(
        err => err 
        )
  }

}