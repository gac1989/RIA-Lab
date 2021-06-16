import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El estudiante se borrará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'No, espera',
    }).then((result) => {

      if (result.isConfirmed) {

        this.estudianteService.borrarEstudiante(id).subscribe(
          data => {
            console.log("eliminado!");
            this.reloadPage();
          }
        )

      } else if (result.isDismissed) {

        console.log('Clicked No, el ESTUDIANTE no se borró.');

      }
    })

  }


  reloadPage(): void {
    window.location.reload();
  }


}
