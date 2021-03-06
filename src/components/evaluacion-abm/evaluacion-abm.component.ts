import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { EvaluacionesService } from 'src/services/evaluaciones.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

@Component({
  selector: 'app-evaluacion-abm',
  templateUrl: './evaluacion-abm.component.html',
  styleUrls: ['./evaluacion-abm.component.scss']
})
export class EvaluacionAbmComponent implements OnInit {

  form: any = {
    titulo: null,
    ponderacion: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  curso?;
  totalPonderaciones?: number = 0;
  total?: number = 0;

  constructor(private authService: AuthService,private califService: EvaluacionesService, private route: ActivatedRoute, public router: Router) { 
    this.route.queryParams.subscribe(params => {
      console.log("EL CURSO EN EL ABM ES: " + params['curso'] )
      this.curso=params['curso'];
      this.total = params['total'];
      this.totalPonderaciones = 100 - this.total;
      console.log(this.totalPonderaciones);
    });
  
  }

  onSubmit(): void {

    const { titulo, ponderacion} = this.form;
    if(ponderacion>this.totalPonderaciones){
      this.showPonderacionAlert();
      return;
    }
    this.califService.postEvaluaciones(titulo, ponderacion, this.curso).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert();
        let curso = this.curso
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
    let id = this.curso
    this.router.navigate(['/evaluaciones'], { queryParams: { id } });
  }
  showSuccessAlert() {
    Swal.fire('OK', 'Evaluacion registrada con éxito!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

  showPonderacionAlert() {
    Swal.fire('Error!', 'La ponderacion no debe superar el maximo!', 'error')
  }


  ngOnInit(): void {
  }

}