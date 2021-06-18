import { Exercise } from "./exercise";

export class Routine{
  idRutina?: number;
  nombre: string;
  nivel: string;
  estado: number;
  idUsuario: number;
  userName?: string;
  ejercicios: Exercise[];
  id_ejercicio?: number[];
  constructor() {
  }
}
