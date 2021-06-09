import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLogginGuard } from 'src/guards/check-loggin.guard';
import { CheckRoleGuard } from 'src/guards/check-role.guard';
import { ClaseComponent } from './clase/clase.component';
import { CursoABMComponent } from './curso-abm/curso-abm.component';
import { CursoEditComponent } from './curso-edit/curso-edit.component';
import { CursoComponent } from './curso/curso.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { HomeComponent } from './home/home.component';
import { IssueComponent } from './issue/issue.component';
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
    component: CursoComponent,
    canActivate: [CheckLogginGuard]
  },
  {
    path:'agregarcurso',
    component: CursoABMComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'editarcurso',
    component: CursoEditComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'roles',
    component: RoleComponent,
    canActivate: [CheckRoleGuard, CheckLogginGuard]
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
    component: ClaseComponent,
    canActivate: [CheckLogginGuard]
  },
  {
    path:'issues',
    component: IssueComponent,
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
    component: EstudianteComponent,
    canActivate: [CheckLogginGuard]
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
