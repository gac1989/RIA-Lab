import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import { CheckRoleGuard } from 'src/guards/check-role.guard';
import { CheckLogginGuard } from 'src/guards/check-loggin.guard';
import { ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showIsLoggin = false;
  showModeratorBoard = false;
  role?: string;
  username?: string;
  route: ActivatedRouteSnapshot
  

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService,
               private checkRoleGuard : CheckRoleGuard,  private checkLogginGuard : CheckLogginGuard) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      this.showIsLoggin = true;
    }
   // this.checkRoleGuard.chequearSiEsAdministrador(this.route).then((value) => {this.showAdminBoard = value; console.log(value)} );
   // this.checkLogginGuard.estaLogueado(this.route).then((value) => {this.showIsLoggin = value; console.log(value)} );
    if(this.tokenStorageService.getRoleName() == "ADMIN"){
      this.showAdminBoard = true;
    }

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}