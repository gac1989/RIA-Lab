import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  form: any = {
    selectedUser: null,
    selectedRol: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  users: [];
  roles: [];

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );

    this.authService.getRoles().subscribe(
      data => {
        this.roles = data;

      },
      err => {
        console.log(err);
      }
    );

  }

  onSubmit(): void {
    const { selectedUser, selectedRol } = this.form;

    this.authService.giveRole(selectedUser, selectedRol).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert();
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
  }

  goHome(){
    this.router.navigateByUrl('/');
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Rol asignado!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }
}
