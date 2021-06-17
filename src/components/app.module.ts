import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { CursoEstudianteABMComponent } from './curso-estudiante-abm/curso-estudiante-abm.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CursoComponent } from './curso/curso.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ClaseComponent } from './clase/clase.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { RoleComponent } from './role/role.component';
import { CursoABMComponent } from './curso-abm/curso-abm.component';
import { CursoEditComponent } from './curso-edit/curso-edit.component';
import { EstudianteAbmComponent } from './estudiante-abm/estudiante-abm.component';
import { EstudianteEditComponent } from './estudiante-edit/estudiante-edit.component';
import { EstudianteCursoABMComponent } from './estudiante-curso-abm/estudiante-curso-abm.component';
import { EvaluacionComponent} from './evaluacion/evaluacion.component';
import { CursosDocenteComponent } from './cursos-docente/cursos-docente.component';
import { ClaseAbmComponent } from './clase-abm/clase-abm.component';
import { EvaluacionAbmComponent } from './evaluacion-abm/evaluacion-abm.component';
import { ClaseEditComponent } from './clase-edit/clase-edit.component';
import { EvaluacionEditComponent } from './evaluacion-edit/evaluacion-edit.component';
import { EstudianteCursoComponent } from './estudiante-curso/estudiante-curso.component';
import { CalificacionComponent } from './calificacion/calificacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CursoComponent,
    EstudianteComponent,
    ClaseComponent,
    EvaluacionComponent,
    HomeComponent,
    RegistroComponent,
    PerfilComponent,
    RoleComponent,
    CursoABMComponent,
    CursoEditComponent,
    EstudianteAbmComponent,
    EstudianteEditComponent,
    EstudianteCursoABMComponent,
    CursosDocenteComponent,
    ClaseAbmComponent,
    EvaluacionAbmComponent,
    ClaseEditComponent,
    CursoEstudianteABMComponent,
    EvaluacionEditComponent,
    EstudianteCursoComponent,
    CalificacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
