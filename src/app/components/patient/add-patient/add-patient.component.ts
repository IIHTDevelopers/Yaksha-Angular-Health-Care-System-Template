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
    this.patientService.createPatient(this.patient).subscribe(
      (data: Patient) => {
        this.router.navigate(['/patients']); // Navigate to the patient list after adding
      },
      (error) => {
        this.errorMessage = 'Failed to add patient';
        console.error('Error adding patient:', error);
      }
    );
  }
}
