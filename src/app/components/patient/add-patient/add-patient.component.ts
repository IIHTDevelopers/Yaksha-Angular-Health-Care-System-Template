import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patient: Patient = {
    id: 0,
    name: '',
    age: 0,
    contactDetails: '',
    medicalHistory: '',
    currentMedications: '',
    assignedRegimens: []
  };
  errorMessage: string = '';

  constructor(private patientService: PatientService, private router: Router) { }

  addPatient(): void {
    // write your logic here
  }
}
