import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert(); 
        this.goLogin();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Usuario registrado con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

  goLogin(){
    this.router.navigateByUrl('/login');
  }


}