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
    // write your logic here
  }

  getPatientDetails(id: number): void {
    // write your logic here
  }

  updatePatient(): void {
    // write your logic here
  }

  deletePatient(): void {
    // write your logic here
  }
}
