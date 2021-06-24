import { CursosService } from 'src/services/cursos.service';
import { EvaluacionesService } from 'src/services/evaluaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {


  service? = EvaluacionesService;
  misCursos? = [] ;
  evaluaciones? = [];
  curso?:number;
  @ViewChild('myDiv') myDiv: ElementRef;

  nombreCurso?;
  totalPonderaciones?: number = 0;

  constructor(private cursosService: CursosService, private cursosCalif: EvaluacionesService,public route: ActivatedRoute, public router: Router ) {
    this.route.queryParams.subscribe(params => {
      this.curso=params['id'];
      this.nombreCurso=params['curso'];
      this.cursosCalif.getEvaluaciones(params['id']).subscribe(
        data=>{
          this.evaluaciones = data;
          for(let evaluacion of this.evaluaciones){
            this.totalPonderaciones+= evaluacion.ponderacion;
          }
          console.log(this.evaluaciones);
          console.log(this.totalPonderaciones);
        }
      );
    });
  }

  callType(value) {
    console.log(value);
    this.cursosCalif.getEvaluaciones(value).subscribe(
      data=>{
        this.evaluaciones = data;
        console.log(this.evaluaciones);
      }
    );
  }

  agregarEvaluacion(curso){
    let total = this.totalPonderaciones;
    console.log("EL CURSO EN EL LISTADO ES: " + curso );
    console.log("el total de ponderacioneses: " + total );
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/evaluaciones-abm'], { queryParams: { curso, total } });
  }

  asignarNotas(id, titulo, ponderacion, curso){
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/calificaciones'], { queryParams: { id, titulo, ponderacion, curso } });
  }

  editar(id, titulo, ponderacion){
    // this.router.navigateByUrl('/editar/' + id);
    let cursoId = this.curso;
    let total = this.totalPonderaciones;
    this.router.navigate(['/editarevaluacion'], { queryParams: { id,  titulo, ponderacion, cursoId, total } });
  }

  borrar(id){
    // this.router.navigateByUrl('/editar/' + id);
    this.cursosCalif.deleteCalif(id).subscribe(
      data=>{
        console.log(data);
        this.reloadPage();
      });
     
  }

   
  reloadPage(): void {
    window.location.reload();
  }

  ngOnInit(): void {
    
  }

}
