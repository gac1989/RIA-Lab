import { CursosService } from 'src/services/cursos.service';
import { CalificacionesService } from 'src/services/calificaciones.service';
import { EstudianteCursoService } from 'src/services/estudiante-curso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss']
})
export class CalificacionComponent implements OnInit {

  
  form: any = {
    notas: [],
    titulo: null,
    fecha: null,
    descripcion: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  evaluacion?;
  nombreEvaluacion?;
  estudiantes?=[];
  curso?;

  constructor(private estudianteService: EstudianteCursoService, private cursosCalif: CalificacionesService,public route: ActivatedRoute, public router: Router,  private formBuilder: FormBuilder ) {
    this.route.queryParams.subscribe(params => {
      this.evaluacion=params['id'];
      this.curso=params['curso'];
      this.nombreEvaluacion=params['titulo'];
      this.estudianteService.getEstudiantesCurso(this.curso).subscribe(
        data=>{
          this.estudiantes = data;
          console.log(this.estudiantes);
        }
      );
    });
  }

  onSubmit(): void {
    for(let estudiante of this.estudiantes){
      this.cursosCalif.postCalificaciones(estudiante.estudiante.id, this.evaluacion, estudiante.estudiante.nota).subscribe(
        data=>{
          console.log(data);
        }
      );
    }
  }

  ngOnInit(): void {
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Usuario registrado con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

}
