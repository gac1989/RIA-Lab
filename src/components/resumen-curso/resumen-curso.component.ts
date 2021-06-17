import { Component, OnInit } from '@angular/core';
import { EstudianteCursoService } from 'src/services/estudiante-curso.service';
import { Router,  ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-resumen-curso',
  templateUrl: './resumen-curso.component.html',
  styleUrls: ['./resumen-curso.component.scss']
})
export class ResumenCursoComponent implements OnInit {

  curso?;

  estudiantes?=[];

  nombreCurso?;

  constructor(private cursosService: EstudianteCursoService, public router: Router, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.curso=params['id'];
      this.nombreCurso=params['curso'];
    });
    this.cursosService.getEstudiantesCurso(this.curso).subscribe(
      data=>{
        this.estudiantes = data;
        console.log(this.estudiantes);
      }
    );
  }

  ngOnInit(): void {
  }

}
