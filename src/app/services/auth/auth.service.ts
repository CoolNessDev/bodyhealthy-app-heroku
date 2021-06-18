import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from 'src/app/models/jwtDto';
import { LoginUserDto } from 'src/app/models/loginUserDto';
import { User } from 'src/app/models/user';
import { TokenService } from './token/token.service';
import { environment } from '../../shared/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token',
    }),
  };
  authURL = `${environment.apiUrl}/auth/`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}
  public login(loginUsuario: LoginUserDto): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }
  public createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.authURL}create`, user);
  }
  public updateUser(user: User): Observable<any> {
    this.setHttpOptions();
    return this.httpClient.put<any>(
      `${this.authURL}update/${user.idUsuario}`,
      user,
      this.httpOptions
    );
  }
  private setHttpOptions() {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + this.tokenService.getToken()
    );
  }
}
