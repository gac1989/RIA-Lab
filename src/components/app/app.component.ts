import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';


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

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = this.tokenStorageService.getUserName();
      this.authService.getRole(this.username).subscribe(
        data => {
          this.role = data;
          console.log(this.role[0]);
          if(this.role[0] == "ADMIN"){
            this.showAdminBoard = true;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}