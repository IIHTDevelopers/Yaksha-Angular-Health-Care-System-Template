import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutRoutine } from '../models/workout-routine.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutRoutineService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllWorkoutRoutines(): any {
    // write your logic here
    return null;
  }

  getWorkoutRoutineById(workoutRoutineId: number): any {
    // write your logic here
    return null;
  }

  createWorkoutRoutine(workoutRoutineData: WorkoutRoutine): any {
    // write your logic here
    return null;
  }

  updateWorkoutRoutine(workoutRoutineId: number, workoutRoutineData: WorkoutRoutine): any {
    // write your logic here
    return null;
  }

  deleteWorkoutRoutine(workoutRoutineId: number): any {
    // write your logic here
    return null;
  }
}
