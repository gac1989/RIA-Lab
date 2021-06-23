import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';
import Swal from 'sweetalert2';
import {ClrDatagridStateInterface} from "@clr/angular";

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  estudiantes?= [];

  ngOnInit(): void {
    this.loading=false;
    this.estudianteService.getEstudiantesPag(5,1,'','','').subscribe(
      data => {
        this.estudiantes = data.lista;
        this.total=data.size;
      }
    );
  }

  
 

  users:[];
  total: number;
  loading: boolean;

  refresh(state: ClrDatagridStateInterface) {
    
    if(state.filters){
      let filters:{[prop:string]: string} = {};
      for (let filter of state.filters) {
        let {property, value} = <{property: string, value: string}>filter;
        filters[property] = value;
      }
      this.loading=true;
      this.estudianteService.getEstudiantesPag(state.page.size,state.page.current,filters['primerNombre'] ,filters['primerApellido'],filters['documento']).subscribe(
        data => {
          this.estudiantes = data.lista;
          console.log(this.estudiantes);
          this.total=data.size;
          this.loading = false;
        }
      );
    }
    else{
      this.loading=true;
      this.estudianteService.getEstudiantesPag(state.page.size,state.page.current,'','','').subscribe(
        data => {
          this.estudiantes = data.lista;
          console.log(this.estudiantes)
          this.loading = false;
        }
      );
    }
   }

   change(e){
    console.log(e);
   }

  constructor(private estudianteService: EstudianteService, public router: Router) {
  }

  editar(id) {
    // this.router.navigateByUrl('/editar/' + id);
    this.router.navigate(['/editarestudiante'], { queryParams: { id } });
  }

  agregarEstudiante(id){
    this.router.navigate(['/agregarcursoestudiante'], { queryParams: { id } });
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
