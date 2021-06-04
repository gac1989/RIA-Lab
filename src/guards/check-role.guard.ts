import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { async, Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleGuard implements CanActivate {



  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, public router: Router){}
  
  async checkRoleUser(route: ActivatedRouteSnapshot): Promise<boolean>{
    let promise = new Promise((resolve) => {
    const isLoggedIn = !!this.tokenStorageService.getToken();
      if (isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        const username = this.tokenStorageService.getUserName();
        this.authService.getRole(username).subscribe(
          data => {
            const role = data;
            if(role[0] == "ADMIN"){
              var flag = true;
              resolve (flag);
            }
          },
          err => {
            var blackflag = false;
            resolve(blackflag);
          }
        );
      }
    });promise.then((res) => {
      return res;
    });
    promise.catch((err) => {
      return err;
    });
    let flag = await promise;
    if(flag == true) return true; else return false;

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    return this.checkRoleUser(route);
  }

  
}
