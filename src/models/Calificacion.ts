export class Calificacion {


    id?: number;
    titulo: string;
    ponderacion: any;
    cursosId: number;
    curso: string
  
    constructor(id: number = 0, titulo: string = '', ponderacion: string = '', cursosId: number = 0, curso: string) {
        this.id = id;
        this.titulo = titulo;
        this.ponderacion = ponderacion;
        this.cursosId = cursosId;
        this.curso = curso;
    }
  }