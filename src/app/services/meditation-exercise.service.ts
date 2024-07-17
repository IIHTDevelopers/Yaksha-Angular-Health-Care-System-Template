import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeditationExercise } from '../models/meditation-exercise.model';

@Injectable({
  providedIn: 'root'
})
export class MeditationExerciseService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllMeditationExercises(): any {
    // write your logic here
    return null;
  }

  getMeditationExerciseById(meditationExerciseId: number): any {
    // write your logic here
    return null;
  }

  createMeditationExercise(meditationExerciseData: MeditationExercise): any {
    // write your logic here
    return null;
  }

  updateMeditationExercise(meditationExerciseId: number, meditationExerciseData: MeditationExercise): any {
    // write your logic here
    return null;
  }

  deleteMeditationExercise(meditationExerciseId: number): any {
    // write your logic here
    return null;
  }
}
