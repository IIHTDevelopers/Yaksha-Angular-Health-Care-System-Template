import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  @Input() patientId: number | null = null;
  patient: Patient | null = null;
  errorMessage: string = '';

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.patientId) {
      this.getPatientDetails(this.patientId);
    } else {
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.getPatientDetails(params['id']);
        }
      });
    }
  }

  getPatientDetails(id: number): void {
    this.patientService.getPatientById(id).subscribe(
      (data: Patient) => {
        this.patient = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }

  updatePatient(): void {
    if (this.patient && this.patient.id) {
      this.patientService.updatePatient(this.patient.id, this.patient).subscribe(
        (data: Patient) => {
          this.patient = data;
          this.router.navigate(['/patients']); // Navigate back to the patient list after updating
        },
        (error) => {
          this.errorMessage = 'Failed to update patient';
          console.error('Error updating patient:', error);
        }
      );
    }
  }

  deletePatient(): void {
    if (this.patient && this.patient.id) {
      this.patientService.deletePatient(this.patient.id).subscribe(
        () => {
          this.router.navigate(['/patients']); // Navigate back to the patient list after deleting
        },
        (error) => {
          this.errorMessage = 'Failed to delete patient';
          console.error('Error deleting patient:', error);
        }
      );
    }
  }
}
