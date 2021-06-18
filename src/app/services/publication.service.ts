import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { TokenService } from './auth/token/token.service';
import { UserService } from './user.service';
import { environment } from '../shared/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token',
    }),
  };
  publicationURL = `${environment.apiUrl}/publicacion`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) {}
  public getPublicationsByPages(
    page: number,
    size: number,
    order: string,
    asc: boolean
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.publicationURL}/pageable?` +
        `page=${page}&size=${size}&order=${order}&asc=${asc}`
    );
  }
  public getPublication(id: number): Observable<Publication> {
    return this.httpClient.get<Publication>(`${this.publicationURL}/${id}`);
  }
  public getPublicationsByUser(id: number): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(
      `${this.publicationURL}/usuario/${id}`
    );
  }
  public postPublication(publication: Publication): Observable<any> {
    this.setHttpOptions();
    return this.httpClient.post<any>(
      `${this.publicationURL}/create`,
      publication,
      this.httpOptions
    );
  }
  public deletePublication(id: number): Observable<any> {
    this.setHttpOptions();
    return this.httpClient.delete<any>(
      `${
        this.publicationURL
      }/delete?id=${id}&idUsuario=${this.userService.getUserId()}`,
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
