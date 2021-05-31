import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CursoComponent } from './curso/curso.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ClaseComponent } from './clase/clase.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PerfilComponent } from './perfil/perfil.component';

import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { RoleComponent } from './role/role.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'



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
    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
