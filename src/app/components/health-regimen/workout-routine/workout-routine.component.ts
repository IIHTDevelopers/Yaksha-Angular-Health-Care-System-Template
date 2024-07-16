import { Component, OnInit } from '@angular/core';
import { WorkoutRoutineService } from '../../../services/workout-routine.service';
import { PatientService } from '../../../services/patient.service';
import { WorkoutRoutine } from '../../../models/workout-routine.model';
import { Patient } from '../../../models/patient.model';
import { forkJoin } from 'rxjs';

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
    this.getWorkoutRoutines();
  }

  getWorkoutRoutines(): void {
    this.workoutRoutineService.getAllWorkoutRoutines().subscribe(
      (data: WorkoutRoutine[]) => {
        this.workoutRoutines = data;
        this.populatePatientNames();
      },
      (error) => {
        this.errorMessage = 'Failed to load workout routines';
        console.error('Error loading workout routines:', error);
      }
    );
  }

  populatePatientNames(): void {
    const patientObservables = this.workoutRoutines.map(workoutRoutine =>
      this.patientService.getPatientById(workoutRoutine.patientId)
    );

    forkJoin(patientObservables).subscribe(
      (patients: Patient[]) => {
        this.workoutRoutinesWithPatientNames = this.workoutRoutines.map((workoutRoutine, index) => ({
          ...workoutRoutine,
          patientName: patients[index].name
        }));
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }

  selectWorkoutRoutine(workoutRoutine: WorkoutRoutine): void {
    this.selectedWorkoutRoutine = workoutRoutine;
    this.routineText = JSON.stringify(workoutRoutine.routine, null, 2); // Convert the routine to a formatted JSON string
    this.getPatientDetails(workoutRoutine.patientId);
  }

  getPatientDetails(patientId: number): void {
    this.patientService.getPatientById(patientId).subscribe(
      (data: Patient) => {
        this.selectedPatient = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }

  createWorkoutRoutine(): void {
    const newWorkoutRoutine: WorkoutRoutine = {
      id: 0,
      patientId: 0,
      routine: []
    };
    this.workoutRoutineService.createWorkoutRoutine(newWorkoutRoutine).subscribe(
      (data: WorkoutRoutine) => {
        this.workoutRoutines.push(data);
        this.populatePatientNames();
      },
      (error) => {
        this.errorMessage = 'Failed to create workout routine';
        console.error('Error creating workout routine:', error);
      }
    );
  }

  updateWorkoutRoutine(workoutRoutine: WorkoutRoutine): void {
    if (!workoutRoutine.id) return;
    try {
      workoutRoutine.routine = JSON.parse(this.routineText); // Parse the JSON string back to an array of objects
    } catch (e) {
      this.errorMessage = 'Invalid routine format';
      console.error('Error parsing routine:', e);
      return;
    }
    this.workoutRoutineService.updateWorkoutRoutine(workoutRoutine.id, workoutRoutine).subscribe(
      (data: WorkoutRoutine) => {
        const index = this.workoutRoutines.findIndex(wr => wr.id === data.id);
        if (index !== -1) {
          this.workoutRoutines[index] = data;
          this.populatePatientNames();
        }
      },
      (error) => {
        this.errorMessage = 'Failed to update workout routine';
        console.error('Error updating workout routine:', error);
      }
    );
  }

  deleteWorkoutRoutine(workoutRoutine: WorkoutRoutine): void {
    if (!workoutRoutine.id) return;
    this.workoutRoutineService.deleteWorkoutRoutine(workoutRoutine.id).subscribe(
      () => {
        this.workoutRoutines = this.workoutRoutines.filter(wr => wr.id !== workoutRoutine.id);
        this.populatePatientNames();
        this.selectedWorkoutRoutine = null;
        this.selectedPatient = null;
      },
      (error) => {
        this.errorMessage = 'Failed to delete workout routine';
        console.error('Error deleting workout routine:', error);
      }
    );
  }
}
