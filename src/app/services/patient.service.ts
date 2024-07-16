import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${patientId}`);
  }

  createPatient(patientData: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patientData);
  }

  updatePatient(patientId: number, patientData: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${patientId}`, patientData);
  }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${patientId}`);
  }
}
