import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientService } from './patient.service';
import { Patient } from '../models/patient.model';

describe('PatientService', () => {
  let service: PatientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });
    service = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all patients', () => {
      const expectedPatients: Patient[] = [
        { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] },
        { id: 2, name: 'Jane Smith', age: 25, contactDetails: '987-654-3210', medicalHistory: 'Asthma', currentMedications: 'Inhaler', assignedRegimens: [] }
      ];
      service.getAllPatients().subscribe((patients: any) => {
        expect(patients).toEqual(expectedPatients);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/patients`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedPatients);
    });

    it('should get patient by ID', () => {
      const expectedPatient: Patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      service.getPatientById(1).subscribe((patient: any) => {
        expect(patient).toEqual(expectedPatient);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/patients/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedPatient);
    });

    it('should create a new patient', () => {
      const newPatient: Patient = { id: 3, name: 'Alice Brown', age: 28, contactDetails: '555-555-5555', medicalHistory: 'Diabetes', currentMedications: 'Insulin', assignedRegimens: [] };
      service.createPatient(newPatient).subscribe((patient: any) => {
        expect(patient).toEqual(newPatient);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/patients`);
      expect(req.request.method).toEqual('POST');
      req.flush(newPatient);
    });

    it('should update patient', () => {
      const updatedPatient: Patient = { id: 1, name: 'John Doe', age: 31, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      service.updatePatient(1, updatedPatient).subscribe((patient: any) => {
        expect(patient).toEqual(updatedPatient);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/patients/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedPatient);
    });

    it('should delete patient', () => {
      service.deletePatient(1).subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/patients/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
