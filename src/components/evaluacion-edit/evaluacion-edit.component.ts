import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { EvaluacionesService } from 'src/services/evaluaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-edit',
  templateUrl: './evaluacion-edit.component.html',
  styleUrls: ['./evaluacion-edit.component.scss']
})



export class EvaluacionEditComponent implements OnInit {



  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  form: any = {
    id: null,
    titulo: null,
    ponderacion: null,
    cursoId: null
  };
  

  constructor(private authService: AuthService,private califService: EvaluacionesService, private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      let { id, titulo, ponderacion, cursoId } = params;
      this.form.id=id;
      this.form.titulo=titulo;
      this.form.ponderacion=ponderacion;
      this.form.cursoId=cursoId;
      console.log("El curso en edit es: " + cursoId);
    });
  }

  onSubmit(): void {

    let { id, titulo, ponderacion, cursoId } = this.form;
   
    this.califService.putEvaluaciones(id, titulo, ponderacion, cursoId).subscribe(
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
    id=cursoId;
    this.router.navigate(['/evaluaciones'], { queryParams: { id } });
  }


  showSuccessAlert() {
    Swal.fire('OK', 'Clase editada con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

  ngOnInit(): void {
  }

}
