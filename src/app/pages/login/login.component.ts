import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginUserDto } from 'src/app/models/loginUserDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  roles: string[];
  loginUser: LoginUserDto;
  error: boolean;
  errormessage : string = 'Error al acceder';
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
    });
    // this.loginForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['/']);
    }
  }
  onSubmit() {
    console.log('submit ', this.loginForm.value.username);
  }
  onLogin(): void {
    this.spinner.show();
    this.error=false;

    this.loginUser = new LoginUserDto(
      this.loginForm.value.username,
      this.loginForm.value.password
      );
      this.authService.login(this.loginUser).subscribe(
        (data) => {
          console.log(data);
          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.fetchUser(data.nombreUsuario);

        },
        (err) => {
        this.error=true;
        this.spinner.hide();
        console.log("Error Login: ",err.error);
        this.errormessage = err.error.message?err.error.message:'Contraseña Incorrecta';
        }
    );
  }
  fetchUser=(email:string)=>{
    this.userService.getUser(email).subscribe(data=>{
      // console.log(data);
      this.userService.setUserId(data.idUsuario.toString());
      this.userService.setUserImg(data.imagen);
      this.userService.setNames(data.nombres);
      this.spinner.hide();
      window.location.reload();
    },err=>{
      console.log("Error: ",err);
      this.spinner.hide();
      this.error=true;
    })
  }
}
