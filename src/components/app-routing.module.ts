import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaseComponent } from './clase/clase.component';
import { CursoComponent } from './curso/curso.component';
import { ErrorComponent } from './error/error.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'error',
    component: ErrorComponent
  },
  {
    path:'cursos',
    component: CursoComponent
  },
  {
    path:'evaluaciones',
    component: EvaluacionComponent
  },
  {
    path:'clases',
    component: ClaseComponent
  },
  {
    path:'registro',
    component: RegistroComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'estudiantes',
    component: EstudianteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
