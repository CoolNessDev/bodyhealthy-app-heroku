import { Muscle } from "./muscle";
export class Exercise {
    idEjercicio?: number;
    nombre: string;
    duracion: number;
    series: number;
    repeticiones: number;
    imagen: string;
    descripcion: string;
    descanso: number;
    musculos?: Muscle[];

    constructor() {
    }
}
