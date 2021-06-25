import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { EvaluacionesService } from 'src/services/evaluaciones.service';
import { CalificacionesService } from 'src/services/calificaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-edit',
  templateUrl: './evaluacion-edit.component.html',
  styleUrls: ['./evaluacion-edit.component.scss']
})



export class EvaluacionEditComponent implements OnInit {



  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  calificaciones?= [];


  form: any = {
    id: null,
    titulo: null,
    ponderacion: null,
    cursoId: null
  };
  
  ponderacionVieja?;
  total?: number;
  maximo?: number;

  constructor(private authService: AuthService,private evaluacionesService: EvaluacionesService, private route: ActivatedRoute, private router: Router, private califService: CalificacionesService) { 
    this.route.queryParams.subscribe(params => {
      let { id, titulo, ponderacion, cursoId, total } = params;
      this.form.id=id;
      this.form.titulo=titulo;
      this.form.ponderacion=ponderacion;
      this.ponderacionVieja=ponderacion;
      this.form.cursoId=cursoId;
      this.total=total;
      this.maximo=100-total;
      this.califService.getCalificaciones(id).subscribe(
        data=>{
          this.calificaciones = data;
          console.log(this.calificaciones);
        }
      );
      console.log("El curso en edit es: " + cursoId);
    });
  }

  onSubmit(): void {
    
    if(this.form.ponderacion+(this.total-this.ponderacionVieja)>100){
      this.showPonderacionAlert();
      return;
    }
    if(!this.checkNotas()){
      this.showNotasAlert();
      return;
    }
    let { id, titulo, ponderacion, cursoId } = this.form;
    this.evaluacionesService.putEvaluaciones(id, titulo, ponderacion, cursoId).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert();
        this.router.navigate(['/evaluaciones'], { queryParams: { id } });
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
    for(let estudiante of this.calificaciones){
      if(estudiante.estudiante.nota){
        console.log(estudiante.estudiante.nota);
        this.califService.putCalificaciones(estudiante.id, estudiante.estudiante.id, this.form.id=id, estudiante.estudiante.nota).subscribe(
          data => {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.showSuccessAlert();
          },
          err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
            this.showErrorAlert();
          }
        );
      }
    }
    id=cursoId;
    this.router.navigate(['/evaluaciones'], { queryParams: { id } });
  }

  checkNotas(): boolean{
    for(let estudiante of this.calificaciones){
      if(0>estudiante.estudiante.nota || estudiante.estudiante.nota>this.form.ponderacion){
        return false;
      }
    }
    return true;
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Clase editada con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

  showNotasAlert() {
    Swal.fire('Error!', 'La nota maxima es: ' + this.form.ponderacion, 'error')
  }

  showPonderacionAlert() {
    Swal.fire('Error!', 'No puede agregar mas de: ' + this.maximo + ' puntos extra.', 'error')
  }
  ngOnInit(): void {
  }

}
