import { Component } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent  {

  settings = {
    actions: {
      custom: [
        {
          name: 'editar',
          title: 'Editar ',
        },
        {
          name: 'borrar',
          title: 'Borrar ',
        },
      ],
    },

    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      nombre_c: {
        title: 'Nombre Curso',
        filter: false
      },
      docente: {
        title: 'Docente Asignado',
        filter: false
      }
    }
  };
  
  data = [

    //aca debo cargar el GET SET del Endpoint de Cursos
    {
      id: "1",
      nombre_c: "Matematica",
      docente: "Pedro Paramo"
    },
    {
      id: "2",
      nombre_c: "Biologia",
      docente: "Maria Neves"
    }
  ];
  
  source: LocalDataSource;
  
  constructor(private authService: AuthService) {
    this.source = new LocalDataSource(this.data);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'Nombre Curso',
        search: query
      },
      {
        field: 'Docente Asignado',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  auth(): void{
      this.authService.getUsers().subscribe(
        data => {
          console.log(data);

        },
        err => {
          console.log(err);
        }
      );
    }
  
}