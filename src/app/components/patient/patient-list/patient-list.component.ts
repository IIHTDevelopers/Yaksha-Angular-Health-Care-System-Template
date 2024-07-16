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
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (data: Patient[]) => {
        this.patients = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load patients';
        console.error('Error loading patients:', error);
      }
    );
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.newPatient = null;
  }

  showCreatePatientForm(): void {
    this.selectedPatient = null;
    this.newPatient = {
      id: 0,
      name: '',
      age: 0,
      contactDetails: '',
      medicalHistory: '',
      currentMedications: '',
      assignedRegimens: []
    };
  }

  createPatient(): void {
    if (this.newPatient) {
      this.patientService.createPatient(this.newPatient).subscribe(
        (data: Patient) => {
          this.patients.push(data);
          this.newPatient = null;
        },
        (error) => {
          this.errorMessage = 'Failed to create patient';
          console.error('Error creating patient:', error);
        }
      );
    }
  }

  updatePatient(patient: Patient): void {
    if (!patient.id) return;
    this.patientService.updatePatient(patient.id, patient).subscribe(
      (data: Patient) => {
        const index = this.patients.findIndex(p => p.id === data.id);
        if (index !== -1) {
          this.patients[index] = data;
        }
      },
      (error) => {
        this.errorMessage = 'Failed to update patient';
        console.error('Error updating patient:', error);
      }
    );
  }

  deletePatient(patient: Patient): void {
    if (!patient.id) return;
    this.patientService.deletePatient(patient.id).subscribe(
      () => {
        this.patients = this.patients.filter(p => p.id !== patient.id);
        this.selectedPatient = null;
      },
      (error) => {
        this.errorMessage = 'Failed to delete patient';
        console.error('Error deleting patient:', error);
      }
    );
  }
}
