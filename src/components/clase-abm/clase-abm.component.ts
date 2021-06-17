import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ClasesService } from 'src/services/clases.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clase-abm',
  templateUrl: './clase-abm.component.html',
  styleUrls: ['./clase-abm.component.scss']
})
export class ClaseAbmComponent implements OnInit {


  form: any = {
    titulo: null,
    fecha: null,
    descripcion: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  curso?;

  constructor(private authService: AuthService,private clasesService: ClasesService, private route: ActivatedRoute, private router: Router) { 
      this.route.queryParams.subscribe(params => {
        console.log("EL CURSO EN EL ABM ES: " + params['curso'] )
        this.curso=params['curso'];
      });


    }

    onSubmit(): void {

      const { titulo, fecha, descripcion} = this.form;
      let fechaClase= new Date(fecha).toJSON() ;
      this.clasesService.createClases(titulo, fechaClase, descripcion, this.curso).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.showSuccessAlert();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.showErrorAlert();
        }
      );
      let id = this.curso;
      this.router.navigate(['/clases'], { queryParams: { id } });
    }
    showSuccessAlert() {
      Swal.fire('OK', 'Clase registrada con éxito!', 'success')
    }
  
    showErrorAlert() {
      Swal.fire('Error!', 'Algo salió mal!', 'error')
    }

  ngOnInit(): void {
  }

}
