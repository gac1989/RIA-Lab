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
  users = [];

  constructor(
    private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    //  this.roles = this.tokenStorage.getUser().roles;
    }
  }

  goHome(): void{
    window.location.href="/home";
    //this.router.navigateByUrl('/home');
  }

  onSubmit(): void {
    const { username, password } = this.form;
    console.log(1);
    this.authService.login(username, password).subscribe(
      data => { 
        this.tokenStorage.saveToken(data.token);
       
        // this.getUserId(username);
        this.tokenStorage.saveUserName(username);
        this.tokenStorage.checkRole().then(role => {
          this.goHome();
        })
        .catch(err => {
          
          this.goHome(); //this.goDocenteHome(/homeDocente) ;; esta func hay q preguntar porq si no es admin puede q tampoco tenga rol no solo ser docente
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        })
      },
      err => {
        console.log(4);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // async getUserId(username): Promise<any> {

  //   this.users = await this.authService.getUsers().toPromise();

  //   console.log (this.users);

  //   var user = this.users.filter(function(){username === this.users.userName})

  //   console.log(user);

  // }

  reloadPage(): void {
    window.location.reload();
  }


}