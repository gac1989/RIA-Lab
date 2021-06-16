import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { async, Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLogginGuard implements CanActivate {

  rol = "";

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, public router: Router){}

  async estaLogueado(route: ActivatedRouteSnapshot): Promise<any> {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean  {
       return this.estaLogueado(route);

    }

  
}
