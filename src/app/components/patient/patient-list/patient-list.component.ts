import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;
  newPatient: Patient | null = null;
  errorMessage: string = '';

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    // write your logic here
  }

  getPatients(): void {
    // write your logic here
  }

  selectPatient(patient: Patient): void {
    // write your logic here
  }

  showCreatePatientForm(): void {
    // write your logic here
  }

  createPatient(): void {
    // write your logic here
  }

  updatePatient(patient: Patient): void {
    // write your logic here
  }

  deletePatient(patient: Patient): void {
    // write your logic here
  }
}
