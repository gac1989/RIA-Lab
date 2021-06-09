import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/services/cursos.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent  {

  cursos? = [] ;

  constructor(private cursosService: CursosService, public router: Router ) {
   this.cursosService.getCursos().subscribe(
      data=>{

        this.cursos = data;
      }
   );
  }

  
  editar(id){
      // this.router.navigateByUrl('/editar/' + id);
      this.router.navigate(['/editarcurso'], { queryParams: { id } });
  }

  borrar(id){
    var borrarCurso = confirm("¿Está seguro que desea borrar el curso?")
    if(borrarCurso){
      this.cursosService.borrarCurso(id).subscribe(
        data=>{
          console.log("eliminado!");
          this.reloadPage();
        }
      )
    }
  }

  reloadPage(): void {
    window.location.reload();
  }


  
}