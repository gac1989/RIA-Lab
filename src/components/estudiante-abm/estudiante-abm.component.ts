import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante-abm',
  templateUrl: './estudiante-abm.component.html',
  styleUrls: ['./estudiante-abm.component.scss']
})
export class EstudianteAbmComponent implements OnInit {

 
  form: any = {
    documento: null,
    primerApellido: null,
    segundoApellido: null,
    primerNombre: null,
    segundoNombre: null,
    fechaNacimiento: null
  };



  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(public router: Router, 
              private estudianteService: EstudianteService
              ) {}

  ngOnInit(): void {

  }


  onSubmit(): void {

    let { documento, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento } = this.form;
    console.log(this.form)
    if(segundoNombre == null){
      segundoNombre = ""
    }

    let fechaNacimiento2 = new Date(fechaNacimiento).toJSON() ;

    this.estudianteService.crearEstudiante(documento, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento2 ).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert();
        this.VerEstudiantes();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
  }

  VerEstudiantes(){
    this.router.navigateByUrl('/estudiantes');
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Usuario registrado con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

}
