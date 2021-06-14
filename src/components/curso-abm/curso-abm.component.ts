import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CursosService } from 'src/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso-abm',
  templateUrl: './curso-abm.component.html',
  styleUrls: ['./curso-abm.component.scss']
})
export class CursoABMComponent implements OnInit {

  form: any = {
    docenteId: null,
    nombre: null,
    programa: null,
    descripcion: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  users =  [];
  docentes = [];

  constructor(private authService: AuthService, 
              public router: Router, 
              private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.listarDocentes();

  }

  async listarDocentes(): Promise<any> {

    this.users = await this.authService.getUsers().toPromise();

    for(var i = 0 ; i < this.users.length; i++){
      const docente = await this.authService.getRole(this.users[i].userName).toPromise();
      if (docente[0] == "DOCENTE" || docente[1] == "DOCENTE"){
        this.docentes.push(this.users[i]);
      }
    }
  }

  onSubmit(): void {

    const { nombre, programa, descripcion, docenteId } = this.form;

    this.cursosService.crearCurso(nombre, programa, descripcion, docenteId).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert();
        this.VerCursos();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
  }

  VerCursos(){
    this.router.navigateByUrl('/cursos');
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Curso registrado con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

}
