import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'bh-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles: string[];
  user: User = new User();
  error: boolean = false;
  errorMessage: string = 'Error al registrar';
  format: string = 'dd/MM/yyyy';

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      // password2: new FormControl(null,[Validators.required, this.equalPassword()]),
    });
  }
  // equalPassword(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     if (control.value !== undefined && control.value == this.password.value) {
  //       return {
  //         equalPassword: true,
  //       };
  //     } else {
  //       return null;
  //     }
  //   };
  // }
  private _onRegister = () => {
    this.error = false;
    if (this.password.value === this.password2.value) {
      this.spinner.show();
      this.user.nombres = this.name.value;
      this.user.apellidos = this.surname.value;
      this.user.correo = this.username.value;
      let fecha =this.date.value;
      this.user.fechaNacimiento = `${fecha.year}-${fecha.month}-${fecha.day}`;
      this.user.contra = this.password.value;

      this.authService.createUser(this.user).subscribe(
        (data) => {
          // console.log(data);
          this.spinner.hide();
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err);
          console.log('Este usuario no es valido');
          this.spinner.hide();
        }
      );
    } else {
      this.error = true;
      this.errorMessage = 'Las contraseñas no coinciden';
    }
  };
  public get onRegister() {
    return this._onRegister;
  }
  public set onRegister(value) {
    this._onRegister = value;
  }
  public get name() {
    return this.registerForm.get('name');
  }
  public get surname() {
    return this.registerForm.get('surname');
  }
  public get username() {
    return this.registerForm.get('username');
  }
  public get date() {
    return this.registerForm.get('date');
  }
  public get password() {
    return this.registerForm.get('password');
  }
  public get password2() {
    return this.registerForm.get('password2');
  }
}
