import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/services/cursos.service';
import Swal from 'sweetalert2';

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

  borrar(id) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El curso se borrará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'No, espera',
    }).then((result) => {

      if (result.isConfirmed) {

        this.cursosService.borrarCurso(id).subscribe(
          data=>{
            console.log("eliminado!");
            this.reloadPage();
          }
        )

      } else if (result.isDismissed) {

        console.log('Clicked No, el curso no se borró.');

      }
    })

  }


  reloadPage(): void {
    window.location.reload();
  }


  
}