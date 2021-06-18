import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './auth/token/token.service';
import { environment } from '../shared/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token',
    }),
  };
  imagenURL = `${environment.apiUrl}/cloudinary` ;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  public uploadImage(imagen: File): Observable<any> {
    this.setHttpOptions();
    const formData = new FormData();
    formData.append('multipartFile', imagen);

    return this.httpClient.post<any>(
      `${this.imagenURL}/upload`,
      formData,
      this.httpOptions
    );
  }
  public deleteImage(id: String): Observable<any> {
    console.log('deleting: ', id);
    this.setHttpOptions();
    return this.httpClient.delete<any>(
      `${this.imagenURL}/delete/${id}`,
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
