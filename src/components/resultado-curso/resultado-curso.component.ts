import { Component, OnInit } from '@angular/core';
import { CalificacionesService } from 'src/services/calificaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionesService } from 'src/services/evaluaciones.service';
import { EstudianteCursoService } from 'src/services/estudiante-curso.service';
import { ControlClassService } from '@clr/angular/forms/common/providers/control-class.service';

import { ChartsModule, WavesModule } from 'angular-bootstrap-md'



@Component({
  selector: 'app-resultado-curso',
  templateUrl: './resultado-curso.component.html',
  styleUrls: ['./resultado-curso.component.scss']
})
export class ResultadoCursoComponent implements OnInit {

  estudiantes?=[];
  curso?;
  nombreCurso?;
  evaluaciones?=[];
  aprobados?: number = 0;
  examen?: number = 0;
  reprobados?: number = 0;

  constructor(private cursosService: EstudianteCursoService, private evaluacionesCurso: EvaluacionesService, private califService: CalificacionesService,public route: ActivatedRoute, public router: Router ) {
    this.route.queryParams.subscribe(params => {
      this.curso=params['id'];
      this.nombreCurso=params['curso'];
      this.primeraParte().then(()=>{
        for(let estudiante of this.estudiantes){
          let notaTotal: number = 0;
          for(let evaluacion of this.evaluaciones){
            for(let calificacion of evaluacion.calificaciones){
              if(calificacion.estudiante.id==estudiante.estudiante.id){
                console.log("Buscando calificacion es: " + estudiante.estudiante.primerNombre + "La nota es: " + calificacion.nota)
                notaTotal+=calificacion.nota;
              }
            }
          }
          console.log("La suma es: " + notaTotal)

          estudiante.promedio=notaTotal/this.evaluaciones.length;
          if(estudiante.promedio>=60){
            this.aprobados++;
          }
          if(estudiante.promedio<60 && estudiante.promedio>=25){
            this.examen++;
          }
          if(estudiante.promedio<25){
            this.reprobados++;
          }
          console.log("El promedio es: " + estudiante.promedio)
          console.log(this.aprobados + '' +  this.examen + '' + this.reprobados)
        }
      })
      /*for(let estudiante of this.estudiantes){
        for(let evaluacion of this.evaluaciones){
          
        }
      }*/
    });
  }


  async primeraParte(): Promise<any>{
     await this.getEvaluaciones().then(async() => {
      console.log("LLEGO A LA EVALUACION");
      await this.getEstudiantesCurso().then(async()=>{
        console.log("LLEGO A LOS ESTUDIANTES");
        for(let evaluacion of this.evaluaciones){
          await this.getCalificaciones(evaluacion.id).then(data=>{
            console.log("LLEGO A LA CALIFICACION");
            evaluacion.calificaciones=data;
          });
        }
      })
    });
    console.log("LLEGO AL FINAL");
    return Promise;
  }

  async getEvaluaciones(): Promise<any>{
    this.evaluaciones = await this.evaluacionesCurso.getEvaluaciones(this.curso).toPromise();
  }

  async getEstudiantesCurso(): Promise<any>{
    this.estudiantes =  await this.cursosService.getEstudiantesCurso(this.curso).toPromise();
    console.log("LLEGEUE A ESTUDIAR");
  }

  async getCalificaciones(id): Promise<any>{
    let calificaciones = await this.califService.getCalificaciones(id).toPromise();
    return calificaciones;
  }

  ngOnInit(): void {
  }


  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}