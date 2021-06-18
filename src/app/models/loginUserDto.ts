export class LoginUserDto {
  correo: string;
  contra: string;

  constructor(correo: string, contra: string) {
    this.correo = correo;
    this.contra = contra;
  }
}
