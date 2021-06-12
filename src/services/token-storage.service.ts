import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const ROLE_NAME = 'role';
const USER_NAME = '';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

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

  public getRoleName(): string | null {
    return window.sessionStorage.getItem(ROLE_NAME);
  }

  public saveUserName(username: string): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public getUserName(): string | null {
    return window.sessionStorage.getItem(USER_NAME);
  }

}