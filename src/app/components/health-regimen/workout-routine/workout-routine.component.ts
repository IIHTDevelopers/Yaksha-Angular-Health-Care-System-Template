import { Component, OnInit } from '@angular/core';
import { WorkoutRoutineService } from '../../../services/workout-routine.service';
import { PatientService } from '../../../services/patient.service';
import { WorkoutRoutine } from '../../../models/workout-routine.model';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.component.html',
  styleUrls: ['./workout-routine.component.css']
})
export class WorkoutRoutineComponent implements OnInit {
  workoutRoutines: WorkoutRoutine[] = [];
  workoutRoutinesWithPatientNames: any[] = [];
  selectedWorkoutRoutine: WorkoutRoutine | null = null;
  selectedPatient: Patient | null = null;
  errorMessage: string = '';
  routineText: string = '';

  constructor(
    private workoutRoutineService: WorkoutRoutineService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    // write your logic here
  }

  getWorkoutRoutines(): void {
    // write your logic here
  }

  populatePatientNames(): void {
    // write your logic here
  }

  selectWorkoutRoutine(workoutRoutine: WorkoutRoutine): void {
    // write your logic here
  }

  getPatientDetails(patientId: number): void {
    // write your logic here
  }

  createWorkoutRoutine(): void {
    // write your logic here
  }

  updateWorkoutRoutine(workoutRoutine: WorkoutRoutine): void {
    // write your logic here
  }

  deleteWorkoutRoutine(workoutRoutine: WorkoutRoutine): void {
    // write your logic here
  }
}
