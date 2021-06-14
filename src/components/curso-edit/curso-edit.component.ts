import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CursosService } from 'src/services/cursos.service';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.scss']
})
export class CursoEditComponent implements OnInit {

  
  form: any = {
    id: null,
    docenteId: null,
    nombre: null,
    programa: null,
    descripcion: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  users =  [];
  docentes = [];


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.form.id = params['id'];
    });
    this.listarDocentes();
    var idNum = parseInt(this.form.id);
    this.cursosService.getCurso(idNum).subscribe(
      data=>{
        console.log(data);
        this.form.docenteId = data.docenteId
        this.form.nombre = data.nombre
        this.form.programa = data.programa
        this.form.descripcion = data.descripcion
      }
    )

  }

  constructor(private authService: AuthService, 
              public router: Router, 
              private cursosService: CursosService,
              private route: ActivatedRoute,
  ) {

  }


  async listarDocentes(): Promise<any> {

    this.users = await this.authService.getUsers().toPromise();

    for(var i = 0 ; i < this.users.length; i++){
      const docente = await this.authService.getRole(this.users[i].userName).toPromise();
      if (docente[0] == "DOCENTE" || docente[1] == "DOCENTE"){
        this.docentes.push(this.users[i]);
      }
    }
  }

  onSubmit(): void {

    const { id, nombre, programa, descripcion, docenteId } = this.form;

    this.cursosService.editarCurso(id, nombre, programa, descripcion, docenteId).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccessAlert();
        this.VerCursos();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showErrorAlert();
      }
    );
  }

  VerCursos(){
    this.router.navigateByUrl('/cursos');
  }

  showSuccessAlert() {
    Swal.fire('OK', 'Curso editado!', 'success')
  }

  showErrorAlert() {
    Swal.fire('Error!', 'Algo salió mal!', 'error')
  }

}
