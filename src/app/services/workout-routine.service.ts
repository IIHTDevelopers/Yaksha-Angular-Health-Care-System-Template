import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkoutRoutine } from '../models/workout-routine.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutRoutineService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Workout Routine-related methods
  getAllWorkoutRoutines(): Observable<WorkoutRoutine[]> {
    return this.http.get<WorkoutRoutine[]>(`${this.apiUrl}/workoutRoutines`);
  }

  getWorkoutRoutineById(workoutRoutineId: number): Observable<WorkoutRoutine> {
    return this.http.get<WorkoutRoutine>(`${this.apiUrl}/workoutRoutines/${workoutRoutineId}`);
  }

  createWorkoutRoutine(workoutRoutineData: WorkoutRoutine): Observable<WorkoutRoutine> {
    return this.http.post<WorkoutRoutine>(`${this.apiUrl}/workoutRoutines`, workoutRoutineData);
  }

  updateWorkoutRoutine(workoutRoutineId: number, workoutRoutineData: WorkoutRoutine): Observable<WorkoutRoutine> {
    return this.http.put<WorkoutRoutine>(`${this.apiUrl}/workoutRoutines/${workoutRoutineId}`, workoutRoutineData);
  }

  deleteWorkoutRoutine(workoutRoutineId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workoutRoutines/${workoutRoutineId}`);
  }
}
