import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsistenciasService } from 'src/services/asistencias.service';




@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {

  clase: number;
  nombreClase: string;
  asistencias?=[];
  curso?: number;
  constructor(private asisService: AsistenciasService,public router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.clase=params['id'];
      this.curso=params['curso'];
      this.nombreClase=params['nombre'];
      console.log(this.nombreClase);
      this.asisService.getAsistencias(this.clase).subscribe(
        data=>{
          this.asistencias = data;
          console.log(this.asistencias);
        }
      );
    });
  }

  onSubmit(): void {
    for(let asistencia of this.asistencias){
      if(asistencia.estudiante.asistio){
        let asist:boolean = (asistencia.estudiante.asistio=='true');
        console.log(asist);
        this.asisService.putAsistencias(asistencia.id, asistencia.estudiante.id, this.clase, asist).subscribe(
          data=>{
            console.log(data);
            this.reloadPage();
          }
        );
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }


  ngOnInit(): void {
  }

}
