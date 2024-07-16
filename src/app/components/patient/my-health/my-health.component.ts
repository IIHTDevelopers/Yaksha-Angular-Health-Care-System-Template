import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-my-health',
  templateUrl: './my-health.component.html',
  styleUrls: ['./my-health.component.css']
})
export class MyHealthComponent implements OnInit {
  currentUser: User | null = null;
  patient: Patient | null = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.getPatientDetails(this.currentUser.id);
    }
  }

  getPatientDetails(userId: number): void {
    this.patientService.getPatientById(userId).subscribe(
      (data: Patient) => {
        this.patient = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }
}
