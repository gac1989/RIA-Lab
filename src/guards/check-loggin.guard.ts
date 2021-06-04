import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/services/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CheckLogginGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean  {
      if (!this.tokenStorageService.getToken()) {
        this.router.navigate(['login']);
      }
      return true;
    }

  
}
