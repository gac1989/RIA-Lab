import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/services/cursos.service';
import { ClasesService } from 'src/services/clases.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss']
})
export class ClaseComponent implements OnInit {

  misCursos? = [];
  clases? = [];
  curso?: number;
  nombreCurso?;
  constructor(private clasesService: ClasesService,public router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.curso=params['id'];
      this.nombreCurso=params['curso'];
      this.clasesService.getClases(params['id']).subscribe(
        data=>{
          this.clases = data;
          console.log(this.clases);
        }
      );
    });
  }

  callType(value) {
    console.log(value);
    this.clasesService.getClases(value).subscribe(
      data=>{
        this.clases = data;
        console.log(this.clases);
      }
    );
  }

  agregarClase(curso){
    console.log("EL CURSO EN EL LISTADO ES: " + curso )
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/clases-abm'], { queryParams: { curso } });
  }

  editar(id, fecha, titulo, descripcion){
    // this.router.navigateByUrl('/editar/' + id);
    console.log(id, fecha, titulo, descripcion);
    let curso = this.curso;
    this.router.navigate(['/editarclase'], { queryParams: { id, fecha, titulo, descripcion, curso } });
  }

  
  borrar(id){
    // this.router.navigateByUrl('/editar/' + id);
    this.clasesService.deleteClases(id).subscribe(
      data=>{
        console.log(data);
        this.reloadPage();
      });
  }

  asistencia(id, nombre){
    this.router.navigate(['/asistencia'], { queryParams: { id, nombre } });
  }

  ngOnInit(): void {
  }

  
  reloadPage(): void {
    window.location.reload();
  }

}
