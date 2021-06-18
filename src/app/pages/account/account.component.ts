import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { UserService } from 'src/app/services/user.service';
import { calculateAge } from 'src/app/shared/utilities';
import { getUrl, getImageId } from '../../shared/utilities';

@Component({
  selector: 'bh-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  userForm: FormGroup;
  roles: string[];
  user: User;
  error: boolean;
  // image
  imagen: File;
  imagenSrc: File;
  newImg: boolean = false;
  getUrl = getUrl;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
    this.fetchUser();
  }
  fetchUser() {
    this.userService.getUser(this.tokenService.getUsername()).subscribe(
      (data) => {
        this.user = data;
        this.loadUser();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadUser = () => {
    this.userForm.get('name').setValue(this.user.nombres);
    this.userForm.get('surname').setValue(this.user.apellidos);
    this.userForm.get('username').setValue(this.user.correo);
    this.userForm.get('date').setValue(calculateAge(this.user.fechaNacimiento));
  };
  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.newImg = true;
      this.imagenSrc = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  onSave = () => {
    if (this.newImg) {
      this.cloudinaryService.uploadImage(this.imagen).subscribe(
        (data) => {
          console.log('Imagen subida: ', data.message);
          this.user.imagen = data.message;
          this.onUpdate();
        },
        (err) => {
          alert(err.error.mensaje);
          this.reset();
        }
      );
    }
  };
  onUpdate(): void {
    this.authService.updateUser(this.user).subscribe(
      (data) => {
        console.log('Usuario actualizado');
        this.deleteImg();
      },
      (err) => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }
  deleteImg = () => {
    if (this.newImg && getImageId(this.user.imagen) != null) {
      this.cloudinaryService
        .deleteImage(getImageId(this.user.imagen))
        .subscribe(
          (data) => {
            console.log('imagen eliminado');
          },
          (err) => {
            console.log('Error: ', err.message);
          }
        );
    }
  };
  reset(): void {
    this.imagen = null;
    this.imagenSrc = null;
  }
}
