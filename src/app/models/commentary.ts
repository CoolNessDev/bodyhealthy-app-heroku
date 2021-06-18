import { Publication } from "./publication";
import { User } from "./user";

export class Commentary{
  idComentario?: number;
  usuario?: User;
  publicacion?: Publication;
  mensaje: string;
  fecha: Date;
}
