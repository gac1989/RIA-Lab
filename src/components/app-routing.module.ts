import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLogginGuard } from 'src/guards/check-loggin.guard';
import { CheckRoleGuard } from 'src/guards/check-role.guard';
import { ClaseComponent } from './clase/clase.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ClaseEditComponent } from './clase-edit/clase-edit.component';
import { ClaseAbmComponent } from './clase-abm/clase-abm.component';
import { EvaluacionAbmComponent } from './evaluacion-abm/evaluacion-abm.component';
import { EvaluacionEditComponent } from './evaluacion-edit/evaluacion-edit.component';
import { CursoEstudianteABMComponent } from './curso-estudiante-abm/curso-estudiante-abm.component';
import { CursoABMComponent } from './curso-abm/curso-abm.component';
import { CursoEditComponent } from './curso-edit/curso-edit.component';
import { CursoComponent } from './curso/curso.component';
import { CursosDocenteComponent } from './cursos-docente/cursos-docente.component';
import { EstudianteAbmComponent } from './estudiante-abm/estudiante-abm.component';
import { EstudianteCursoABMComponent } from './estudiante-curso-abm/estudiante-curso-abm.component';
import { EstudianteEditComponent } from './estudiante-edit/estudiante-edit.component';
import { EstudianteCursoComponent } from './estudiante-curso/estudiante-curso.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { RoleComponent } from './role/role.component';
import { CheckDocenteGuard } from 'src/guards/check-docente.guard';
import { ResultadoCursoComponent } from './resultado-curso/resultado-curso.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'cursos',
    component: CursoComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'asistencia',
    component: AsistenciaComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'cursos-docente',
    component: CursosDocenteComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'agregarcurso',
    component: CursoABMComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'resultadocurso',
    component: ResultadoCursoComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'editarcurso',
    component: CursoEditComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'agregarestudiantecurso',
    component: EstudianteCursoABMComponent,
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
    component: EvaluacionComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'evaluaciones-abm',
    component: EvaluacionAbmComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'calificaciones',
    component: CalificacionComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'editarevaluacion',
    component: EvaluacionEditComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'agregarcursoestudiante',
    component: CursoEstudianteABMComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'clases',
    component: ClaseComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'editarclase',
    component: ClaseEditComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'clases-abm',
    component: ClaseAbmComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
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
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'estudiantescurso',
    component: EstudianteCursoComponent,
    canActivate: [CheckLogginGuard, CheckDocenteGuard]
  },
  {
    path:'agregarestudiante',
    component: EstudianteAbmComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
  },
  {
    path:'editarestudiante',
    component: EstudianteEditComponent,
    canActivate: [CheckLogginGuard, CheckRoleGuard]
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
