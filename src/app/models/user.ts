export class User {
  idUsuario?:number;
  imagen: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;//to spring
  altura: number;
  peso: number;
  correo: string;
  contra?: string;
  constructor() {}
}
