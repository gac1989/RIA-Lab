import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/services/cursos.service';
import { EstudianteService } from 'src/services/estudiante.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { EstudianteCursoService } from 'src/services/estudiante-curso.service';

@Component({
  selector: 'app-estudiante-curso-abm',
  templateUrl: './estudiante-curso-abm.component.html',
  styleUrls: ['./estudiante-curso-abm.component.scss']
})
export class EstudianteCursoABMComponent implements OnInit {

 
  form: any = {
    id: null,
    selectedEstudiante: null,
    selectedCurso: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  estudiantes: [];
  estudiantescurso: [];
  cursos: [];
  nombreCurso = "";
  nombreEstudiante = "";


  constructor(private route: ActivatedRoute, 
              private estudianteService: EstudianteService,
              private estudianteCursoService: EstudianteCursoService, 
              public router: Router, 
              private cursoService: CursosService) {
                
    

              }

  ngOnInit(): void {

    this.listarCursos();
    this.listarEstudiantes();

    this.route.queryParams.subscribe(params => {
      this.form.id = params['id'];
    });
    var idNum = parseInt(this.form.id);
    this.cursoService.getCurso(idNum).subscribe(
      data=>{
        this.form.selectedCurso = data.id;
      }
    )
    this.estudianteCursoService.getEstudiantesCurso(idNum).subscribe(
      data=>{
        this.estudiantescurso = data;
        console.log(this.estudiantes);
      }
    );

  }


  async listarCursos(): Promise<any> {
    this.cursos = await this.cursoService.getCursos().toPromise();
    console.log(this.cursos)
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

  borrar(id){
    this.estudianteCursoService.borrarEstudiante(id).subscribe(
      data => {
        window.location.reload();
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
