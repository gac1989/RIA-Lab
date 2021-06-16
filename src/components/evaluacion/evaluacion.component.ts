import { CursosService } from 'src/services/cursos.service';
import { CalificacionesService } from 'src/services/calificaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {


  service? = CalificacionesService;
  misCursos? = [] ;
  evaluaciones? = [];
  curso?:number;
  @ViewChild('myDiv') myDiv: ElementRef;




  constructor(private cursosService: CursosService, private cursosCalif: CalificacionesService,public route: ActivatedRoute, public router: Router ) {
    this.route.queryParams.subscribe(params => {
      this.curso=params['id'];
      this.cursosCalif.getCalificaciones(params['id']).subscribe(
        data=>{
          this.evaluaciones = data;
          console.log(this.evaluaciones);
        }
      );
    });
  }

  callType(value) {
    console.log(value);
    this.cursosCalif.getCalificaciones(value).subscribe(
      data=>{
        this.evaluaciones = data;
        console.log(this.evaluaciones);
      }
    );
  }

  agregarEvaluacion(curso){
    console.log("EL CURSO EN EL LISTADO ES: " + curso )
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/evaluaciones-abm'], { queryParams: { curso } });
  }


  ngOnInit(): void {
    
  }

}
