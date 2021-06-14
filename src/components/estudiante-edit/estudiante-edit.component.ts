import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';

@Component({
  selector: 'app-estudiante-edit',
  templateUrl: './estudiante-edit.component.html',
  styleUrls: ['./estudiante-edit.component.scss']
})
export class EstudianteEditComponent implements OnInit {

  
  form: any = {
    id: null,
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


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.form.id = params['id'];
    });

    var idNum = parseInt(this.form.id);
    this.estudianteService.getEstudiante(idNum).subscribe(
      data=>{
        console.log(data);
        this.form.documento = data.documento
        this.form.primerApellido = data.primerApellido
        this.form.segundoApellido = data.segundoApellido
        this.form.primerNombre = data.primerNombre
        this.form.segundoNombre = data.segundoNombre
        let s = new Date(data.fechaNacimiento)

        this.form.fechaNacimiento = s.getMonth()+1 + "/" + s.getDate() + "/" + s.getFullYear(); //06/15/2021

      }
    )

  }

  constructor(public router: Router, 
              private estudianteService: EstudianteService,
              private route: ActivatedRoute,
  ) {}

  onSubmit(): void {

    let { id, documento, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento } = this.form;
    
    let segundoNombre2 = segundoNombre;
    if(segundoNombre2 == null){
      segundoNombre2 = "";
    }
    let fechaNacimiento2 = new Date(fechaNacimiento).toJSON() ;
    

    this.estudianteService.editarEstudiante(id, documento, primerApellido, segundoApellido, primerNombre, segundoNombre2, fechaNacimiento2).subscribe(
      data => {
        console.log(this.form);
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