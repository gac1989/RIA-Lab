export class Curso {


    id?: number;
    nombre: string;
    descripcion: string;
    programa: string;
    userId: string
  
    constructor(nombre: string = '', descripcion: string = '', programa: string = '', userId: string = '') {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.programa = programa;
        this.userId = userId;
    }
  }