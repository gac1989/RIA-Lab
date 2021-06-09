import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';
import { CheckRoleGuard } from 'src/guards/check-role.guard';
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
  showModeratorBoard = false;
  role?: string;
  username?: string;
  route: ActivatedRouteSnapshot
  

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private checkRoleGuard : CheckRoleGuard) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.checkRoleGuard.checkRoleUser(this.route)){
      this.showAdminBoard = true;
    }
      
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}