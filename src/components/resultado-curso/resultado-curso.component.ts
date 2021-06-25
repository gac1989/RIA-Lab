import { Component, OnInit } from '@angular/core';
import { CalificacionesService } from 'src/services/calificaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionesService } from 'src/services/evaluaciones.service';
import { AsistenciasService } from 'src/services/asistencias.service';
import { ClasesService } from 'src/services/clases.service';
import { EstudianteCursoService } from 'src/services/estudiante-curso.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-resultado-curso',
  templateUrl: './resultado-curso.component.html',
  styleUrls: ['./resultado-curso.component.scss']
})
export class ResultadoCursoComponent implements OnInit {

  estudiantes?=[];
  curso?;
  clases?;
  nombreCurso?;
  evaluaciones?=[];
  asistencias?=[];
  aprobados?: number = 0;
  examen?: number = 0;
  reprobados?: number = 0;
  estBuenos?: number =0;
  estMalos?: number = 0;
  estMedios?: number = 0;
  loading?: boolean = true;


  //Grafica aprobados
  public pieChartLabels: Label[] = [['REPROBADOS'], ['APROBADOS'], 'EXAMEN'];
  public pieChartData: number[] = [this.reprobados, this.aprobados, this.examen];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  //Grafica asistencia

  public pieChartLabels2: Label[] = [['Menor 40%'], ['Mayor 80%'], ['Entre 40% y 80%']];
  public pieChartData2: number[] = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartColors2 = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private clasesService: ClasesService, private asistenciasService: AsistenciasService, private cursosService: EstudianteCursoService, private evaluacionesCurso: EvaluacionesService, private califService: CalificacionesService,public route: ActivatedRoute, public router: Router ) {
    this.route.queryParams.subscribe(params => {
      this.curso=params['id'];
      this.nombreCurso=params['curso'];
      this.primeraParte().then(()=>{
        this.segundaParte().then(()=>{
          for(let estudiante of this.estudiantes){
            let notaTotal: number = 0;
            for(let evaluacion of this.evaluaciones){
              for(let calificacion of evaluacion.calificaciones){
                if(calificacion.estudiante.id==estudiante.estudiante.id){
                  notaTotal+=calificacion.nota;
                }
              }
            }
            estudiante.promedio=Math.round(notaTotal);
            if(estudiante.promedio>=60){
              this.aprobados++;
            }
            if(estudiante.promedio<60 && estudiante.promedio>=25){
              this.examen++;
            }
            if(estudiante.promedio<25){
              this.reprobados++;
            }
            let totalasistencia: number = 0;
            for(let clase of this.clases){
              for(let asistencia of clase.asistencias){
                if(asistencia.estudiante.id==estudiante.estudiante.id && asistencia.asiste==true){
                  totalasistencia++;
                }
              }
            }
            let promasist = (totalasistencia/this.clases.length)*100;
            estudiante.asistencia=Math.round(promasist);
            if(estudiante.asistencia>=80){
              this.estBuenos++;
            }
            else if(estudiante.asistencia<80 && estudiante.asistencia>=40){
              this.estMedios++;
            }
            else{
              this.estMalos++;
            }
          }
          this.pieChartData2=[this.estMalos, this.estBuenos, this.estMedios];
          this.pieChartData=[this.reprobados, this.aprobados, this.examen];
          this.loading=false;
        })
      })
    });
  }


  async primeraParte(): Promise<any>{
     await this.getEvaluaciones().then(async() => {
      await this.getEstudiantesCurso().then(async()=>{
        for(let evaluacion of this.evaluaciones){
          await this.getCalificaciones(evaluacion.id).then(data=>{
            evaluacion.calificaciones=data;
          });
        }
      })
    });
    return Promise;
  }

  async segundaParte(): Promise<any>{
    await this.getClases().then(async() => {
      for(let clase of this.clases){
        await this.getAsistencias(clase.id).then(data=>{
          clase.asistencias=data;
        })
      }
    });
   return Promise;
 }

 async getClases(): Promise<any>{
    this.clases = await this.clasesService.getClases(this.curso).toPromise();
  }

 async getAsistencias(id): Promise<any>{
  let asistencias = await this.asistenciasService.getAsistencias(id).toPromise();
  return asistencias;
}

  async getEvaluaciones(): Promise<any>{
    this.evaluaciones = await this.evaluacionesCurso.getEvaluaciones(this.curso).toPromise();
  }

  async getEstudiantesCurso(): Promise<any>{
    this.estudiantes =  await this.cursosService.getEstudiantesCurso(this.curso).toPromise();
  }

  async getCalificaciones(id): Promise<any>{
    let calificaciones = await this.califService.getCalificaciones(id).toPromise();
    return calificaciones;
  }

  ngOnInit(): void {
  }

}