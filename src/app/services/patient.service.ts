import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllPatients(): any {
    // write your logic here
    return null;
  }

  getPatientById(patientId: number): any {
    // write your logic here
    return null;
  }

  createPatient(patientData: Patient): any {
    // write your logic here
    return null;
  }

  updatePatient(patientId: number, patientData: Patient): any {
    // write your logic here
    return null;
  }

  deletePatient(patientId: number): any {
    // write your logic here
    return null;
  }
}
