import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-docente',
  templateUrl: './cursos-docente.component.html',
  styleUrls: ['./cursos-docente.component.scss']
})
export class CursosDocenteComponent implements OnInit {

  misCursos? = [];

  constructor(private cursosService: CursosService, public router: Router) {
    this.cursosService.misCursos().subscribe(
      data=>{
        this.misCursos = data;
      }
    );
   }

   mostrarClases(id, curso){
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/clases'], { queryParams: { id, curso } });
  }
  mostrarEvaluaciones(id, curso){
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/evaluaciones'], { queryParams: { id, curso } });
  }

  mostrarEstudiantes(id, curso){
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/estudiantescurso'], { queryParams: { id, curso } });
  }

  ngOnInit(): void {
  }

}
