import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muscle } from '../models/muscle';
import { environment } from '../shared/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  muscleURL = `${environment.apiUrl}/musculo`;
  constructor(private httpClient: HttpClient) { }



  public getAllMuscles():Observable<Muscle>{
    return this.httpClient.get<Muscle>(`${this.muscleURL}/list`);
  }
}

