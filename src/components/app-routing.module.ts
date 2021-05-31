import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaseComponent } from './clase/clase.component';
import { CursoComponent } from './curso/curso.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'cursos',
    component: CursoComponent
  },
  {
    path:'roles',
    component: RoleComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
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
  },
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
