import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/services/cursos.service';
import { EstudianteService } from 'src/services/estudiante.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { EstudianteCursoService } from 'src/services/estudiante-curso.service';
import { param } from 'jquery';


@Component({
  selector: 'app-curso-estudiante-abm',
  templateUrl: './curso-estudiante-abm.component.html',
  styleUrls: ['./curso-estudiante-abm.component.scss']
})
export class CursoEstudianteABMComponent implements OnInit {

 
  form: any = {
    id: null,
    selectedEstudiante: null,
    selectedCurso: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  estudiantes: [];
  cursos: [];
  nombreCurso = "";
  nombreEstudiante = "";


  constructor(private route: ActivatedRoute, 
              private estudianteService: EstudianteService,
              private estudianteCursoService: EstudianteCursoService, 
              public router: Router, 
              private cursoService: CursosService) {}

ngOnInit(): void {

this.listarCursos();
this.listarEstudiantes();

this.route.queryParams.subscribe(params => {
    this.form.id = params['id'];
});
var idNum = parseInt(this.form.id);
console.log('el numero es: ' + idNum);
this.estudianteService.getEstudiante(idNum).subscribe(
    data=>{
    this.form.selectedEstudiante = data.id;
    console.log(this.form.selectedEstudiante);
    }
)

}


async listarCursos(): Promise<any> {
this.cursos = await this.cursoService.getCursos().toPromise();
//console.log(this.cursos)
}

async listarEstudiantes(): Promise<any> {
this.estudiantes = await this.estudianteService.getEstudiantes().toPromise();

}

onSubmit(): void {
    const { selectedEstudiante, selectedCurso } = this.form;

this.estudianteCursoService.agregarEstCurso(selectedEstudiante, selectedCurso).subscribe(
    data => {
    console.log(data);
    this.nombreCurso = data.curso.nombre;
    this.nombreEstudiante = data.estudiante.primerNombre + ' ' + data.estudiante.primerApellido;
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
Swal.fire('OK', 'Se agregó ' + this.nombreEstudiante + ' al curso ' + this.nombreCurso , 'success')
}

showErrorAlert() {
Swal.fire('Error!', 'Algo salió mal!', 'error')
}
}