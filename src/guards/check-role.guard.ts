import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { async, Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleGuard implements CanActivate {

  rol = "";

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, public router: Router){}


  async chequearSiEsAdministrador(route: ActivatedRouteSnapshot): Promise<any> {
    const isLoggedIn = !!this.tokenStorageService.getToken();
    if (isLoggedIn) {
      console.log(this.tokenStorageService.getRoleName());
      if(this.tokenStorageService.getRoleName() == "ADMIN"){
        return true;
      }else{
        return false;
      }
    }
    return false;

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.chequearSiEsAdministrador(route);
  }


}