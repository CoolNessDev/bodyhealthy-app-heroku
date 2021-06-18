import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../shared/environment.prod';
const USERIMG_KEY = 'Userimg';
const USERID_KEY = 'UserId';
const NAMES_KEY = 'Names';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token',
    }),
  };
  userURL = `${environment.apiUrl}/usuario`;
  constructor(private httpClient: HttpClient) {}
  public setUserImg(img: string): void {
    window.sessionStorage.removeItem(USERIMG_KEY);
    window.sessionStorage.setItem(USERIMG_KEY, img);
  }
  public getUserImg(): string {
    return sessionStorage.getItem(USERIMG_KEY);
  }

  public setUserId(id: string): void {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, id);
  }
  public getUserId(): string {
    return sessionStorage.getItem(USERID_KEY);
  }

  public setNames(names: string): void {
    window.sessionStorage.removeItem(NAMES_KEY);
    window.sessionStorage.setItem(NAMES_KEY, names);
  }
  public getNames(): string {
    return sessionStorage.getItem(NAMES_KEY);
  }
  public getUser(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.userURL}/${email}`);
  }
}
