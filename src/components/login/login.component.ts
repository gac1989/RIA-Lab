import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  rol = ""

  constructor(
    private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    //  this.roles = this.tokenStorage.getUser().roles;
    }
  }

  goHome(): void{
    this.router.navigateByUrl('/home');
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      data => { 
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUserName(username);
        this.chequearSiEsAdministrador(username).then(()=>{
          this.tokenStorage.saveRoleName("ADMIN");
        }) 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
        this.goHome();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  async chequearSiEsAdministrador(username): Promise<boolean> {
      try{
        this.rol = await this.authService.getRole(username).toPromise();
        if(this.rol[0] == "ADMIN" || this.rol[1] == "ADMIN") return true;
      }catch(e){
        return false;
      }
      console.log("chequeando")
    }


}