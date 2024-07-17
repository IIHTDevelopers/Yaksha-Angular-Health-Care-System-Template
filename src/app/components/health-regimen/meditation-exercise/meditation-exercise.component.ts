import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeditationExerciseService } from '../../../services/meditation-exercise.service';
import { PatientService } from '../../../services/patient.service';
import { MeditationExercise } from '../../../models/meditation-exercise.model';
import { Patient } from '../../../models/patient.model';

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
    // write your logic here
  }

  getMeditationExercises(): void {
    // write your logic here
  }

  populatePatientNames(): void {
    // write your logic here
  }

  selectMeditationExercise(meditationExercise: MeditationExercise): void {
    // write your logic here
  }

  getPatientDetails(patientId: number): void {
    // write your logic here
  }

  createMeditationExercise(): void {
    // write your logic here
  }

  updateMeditationExercise(meditationExercise: MeditationExercise): void {
    // write your logic here
  }

  deleteMeditationExercise(meditationExercise: MeditationExercise): void {
    // write your logic here
  }
}
