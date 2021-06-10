import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  estudiantes?= [];

  ngOnInit(): void {}

  constructor(private estudianteService: EstudianteService, public router: Router) {
    this.estudianteService.getEstudiantes().subscribe(
      data => {

        this.estudiantes = data;
      }
    );
  }


  editar(id) {
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/editarestudiante'], { queryParams: { id } });
  }

  borrar(id) {
    var borrarCurso = confirm("¿Está seguro que desea borrar el estudiante?")
    if (borrarCurso) {
      this.estudianteService.borrarEstudiante(id).subscribe(
        data => {
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
