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

  ponderacion?;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  evaluacion?;
  nombreEvaluacion?;
  estudiantes?=[];
  curso?;
  califico?: boolean;
  

  constructor(private estudianteService: EstudianteCursoService, private cursosCalif: CalificacionesService,public route: ActivatedRoute, public router: Router,  private formBuilder: FormBuilder ) {
    this.route.queryParams.subscribe(params => {
      this.evaluacion=params['id'];
      this.curso=params['curso'];
      this.ponderacion=params['ponderacion'];
      this.nombreEvaluacion=params['titulo'];
      this.cursosCalif.getCalificaciones(this.evaluacion).subscribe(
        data=>{
          this.califico=(data.length != 0);
          console.log(this.califico);
        }
      );
      this.estudianteService.getEstudiantesCurso(this.curso).subscribe(
        data=>{
          this.estudiantes = data;
          //console.log(this.estudiantes);
        }
      );
    });
  }

  onSubmit(): void {
    if(!this.checkNotas()){
      this.showNotaAlert();
      return;
    }
    if(!this.califico && this.checkNotas()){
      for(let estudiante of this.estudiantes){
        this.cursosCalif.postCalificaciones(estudiante.estudiante.id, this.evaluacion, estudiante.estudiante.nota).subscribe(
          data=>{
            console.log(data);
          }
        );
      }
      let id = this.curso;
      this.showSuccessAlert();
      this.router.navigate(['/evaluaciones'], { queryParams: { id } });
    }
  }

  checkNotas(): boolean{
    for(let estudiante of this.estudiantes){
      if(!estudiante.estudiante.nota || 0>estudiante.estudiante.nota || estudiante.estudiante.nota>this.ponderacion){
        return false;
      }
    }
    return true;
  }

  ngOnInit(): void {
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Calificaciones registradas con ??xito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo sali?? mal!', 'error')
  }

  showNotaAlert() {
    Swal.fire('Error!', 'Ingrese una nota valida' , 'error')
  }
}
