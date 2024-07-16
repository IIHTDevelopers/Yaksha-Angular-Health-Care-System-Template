import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeditationExerciseService } from '../../../services/meditation-exercise.service';
import { PatientService } from '../../../services/patient.service';
import { MeditationExercise } from '../../../models/meditation-exercise.model';
import { Patient } from '../../../models/patient.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-meditation-exercise',
  templateUrl: './meditation-exercise.component.html',
  styleUrls: ['./meditation-exercise.component.css']
})
export class MeditationExerciseComponent implements OnInit {
  meditationExercises: MeditationExercise[] = [];
  meditationExercisesWithPatientNames: any[] = [];
  selectedMeditationExercise: MeditationExercise | null = null;
  selectedPatient: Patient | null = null;
  errorMessage: string = '';
  exercisesText: string = '';

  constructor(
    private meditationExerciseService: MeditationExerciseService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMeditationExercises();
  }

  getMeditationExercises(): void {
    this.meditationExerciseService.getAllMeditationExercises().subscribe(
      (data: MeditationExercise[]) => {
        this.meditationExercises = data;
        this.populatePatientNames();
      },
      (error) => {
        this.errorMessage = 'Failed to load meditation exercises';
        console.error('Error loading meditation exercises:', error);
      }
    );
  }

  populatePatientNames(): void {
    const patientObservables = this.meditationExercises.map(meditationExercise =>
      this.patientService.getPatientById(meditationExercise.patientId)
    );

    forkJoin(patientObservables).subscribe(
      (patients: Patient[]) => {
        this.meditationExercisesWithPatientNames = this.meditationExercises.map((meditationExercise, index) => ({
          ...meditationExercise,
          patientName: patients[index].name
        }));
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }

  selectMeditationExercise(meditationExercise: MeditationExercise): void {
    this.selectedMeditationExercise = meditationExercise;
    this.exercisesText = JSON.stringify(meditationExercise.exercises, null, 2); // Convert the exercises to a formatted JSON string
    this.getPatientDetails(meditationExercise.patientId);
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

  createMeditationExercise(): void {
    const newMeditationExercise: MeditationExercise = {
      id: 0,
      patientId: 0,
      exercises: []
    };
    this.meditationExerciseService.createMeditationExercise(newMeditationExercise).subscribe(
      (data: MeditationExercise) => {
        this.meditationExercises.push(data);
        this.populatePatientNames();
      },
      (error) => {
        this.errorMessage = 'Failed to create meditation exercise';
        console.error('Error creating meditation exercise:', error);
      }
    );
  }

  updateMeditationExercise(meditationExercise: MeditationExercise): void {
    if (!meditationExercise.id) return;
    try {
      meditationExercise.exercises = JSON.parse(this.exercisesText); // Parse the JSON string back to an array of objects
    } catch (e) {
      this.errorMessage = 'Invalid exercises format';
      console.error('Error parsing exercises:', e);
      return;
    }
    this.meditationExerciseService.updateMeditationExercise(meditationExercise.id, meditationExercise).subscribe(
      (data: MeditationExercise) => {
        const index = this.meditationExercises.findIndex(me => me.id === data.id);
        if (index !== -1) {
          this.meditationExercises[index] = data;
          this.populatePatientNames();
        }
      },
      (error) => {
        this.errorMessage = 'Failed to update meditation exercise';
        console.error('Error updating meditation exercise:', error);
      }
    );
  }

  deleteMeditationExercise(meditationExercise: MeditationExercise): void {
    if (!meditationExercise.id) return;
    this.meditationExerciseService.deleteMeditationExercise(meditationExercise.id).subscribe(
      () => {
        this.meditationExercises = this.meditationExercises.filter(me => me.id !== meditationExercise.id);
        this.populatePatientNames();
        this.selectedMeditationExercise = null;
        this.selectedPatient = null;
      },
      (error) => {
        this.errorMessage = 'Failed to delete meditation exercise';
        console.error('Error deleting meditation exercise:', error);
      }
    );
  }
}
