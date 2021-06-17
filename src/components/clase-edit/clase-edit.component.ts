import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ClasesService } from 'src/services/clases.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clase-edit',
  templateUrl: './clase-edit.component.html',
  styleUrls: ['./clase-edit.component.scss']
})
export class ClaseEditComponent implements OnInit {


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  curso?;

  form: any = {
    id: null,
    titulo: null,
    fecha: null,
    descripcion: null
  };

  clase?;

  constructor(private authService: AuthService,private clasesService: ClasesService, private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      let { id, fecha, titulo, descripcion, curso } = params;
      console.log("LA CLASE EN EL EDIT ES: " + curso);
      this.form.id=id;
      this.form.titulo=titulo;
      this.form.fecha=fecha;
      this.form.descripcion=descripcion;
      this.curso=curso;
    });
  }

  onSubmit(): void {

    let { id, titulo, fecha, descripcion } = this.form;
   
    let fechaNueva = new Date(fecha).toJSON() ;
    let cursoId = this.curso;
    this.clasesService.putClases(id, titulo, fechaNueva, descripcion, cursoId).subscribe(
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
    this.router.navigate(['/clases'], { queryParams: { id } });
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
