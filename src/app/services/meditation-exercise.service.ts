import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeditationExercise } from '../models/meditation-exercise.model';

@Injectable({
  providedIn: 'root'
})
export class MeditationExerciseService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Meditation Exercise-related methods
  getAllMeditationExercises(): Observable<MeditationExercise[]> {
    return this.http.get<MeditationExercise[]>(`${this.apiUrl}/meditationExercises`);
  }

  getMeditationExerciseById(meditationExerciseId: number): Observable<MeditationExercise> {
    return this.http.get<MeditationExercise>(`${this.apiUrl}/meditationExercises/${meditationExerciseId}`);
  }

  createMeditationExercise(meditationExerciseData: MeditationExercise): Observable<MeditationExercise> {
    return this.http.post<MeditationExercise>(`${this.apiUrl}/meditationExercises`, meditationExerciseData);
  }

  updateMeditationExercise(meditationExerciseId: number, meditationExerciseData: MeditationExercise): Observable<MeditationExercise> {
    return this.http.put<MeditationExercise>(`${this.apiUrl}/meditationExercises/${meditationExerciseId}`, meditationExerciseData);
  }

  deleteMeditationExercise(meditationExerciseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/meditationExercises/${meditationExerciseId}`);
  }
}
