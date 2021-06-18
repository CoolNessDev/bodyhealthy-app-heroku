import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './auth/token/token.service';
import { environment } from '../shared/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token',
    }),
  };
  exerciseURL = `${environment.apiUrl}/ejercicio`;
  imagenURL = `${environment.apiUrl}/cloudinary`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}
  public getExercises(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.exerciseURL}/lista`);
  }
  public getExercisesFound(name: string): Observable<any> {
    return this.httpClient.get<any>(`${this.exerciseURL}/find?` + `var=${name}`);
  }
  public getExercisesByPages(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get<any>(`${this.exerciseURL}/list?` + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  public getExercisesByRoutine(id:number): Observable<any> {
    return this.httpClient.get<any>(`${this.exerciseURL}/rutina/${id}`);
  }
  public getExercisesByMuscle(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.exerciseURL}/musculo/${id}`);
  }
  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.exerciseURL}/${id}`);
  }
  public save(exercise: any): Observable<any> {
    console.log("Creando: ",exercise);

    this.setHttpOptions();
    return this.httpClient.post<any>(
      `${this.exerciseURL}/create`,
      exercise,
      this.httpOptions
    );
  }
  public update(id: number, exercise: any): Observable<any> {
    this.setHttpOptions();
    return this.httpClient.put<any>(
      `${this.exerciseURL}/update/${id}`,
      exercise,
      this.httpOptions
    );
  }
  public delete(id: number): Observable<any> {
    this.setHttpOptions();
    return this.httpClient.delete<any>(
      `${this.exerciseURL}/delete/${id}`,
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
