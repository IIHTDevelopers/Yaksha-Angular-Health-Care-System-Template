import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientListComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [PatientService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch patients on init', () => {
      const expectedPatients: Patient[] = [
        { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] },
        { id: 2, name: 'Jane Smith', age: 25, contactDetails: '987-654-3210', medicalHistory: 'Asthma', currentMedications: 'Inhaler', assignedRegimens: [] }
      ];

      component.ngOnInit();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedPatients);

      expect(component.patients).toEqual(expectedPatients);
    });

    it('should handle error when fetching patients fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.ngOnInit();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients`);
      expect(req.request.method).toBe('GET');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to load patients');
      expect(component.patients).toEqual([]);
    });

    it('should select a patient', () => {
      const selectedPatient: Patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };

      component.selectPatient(selectedPatient);

      expect(component.selectedPatient).toEqual(selectedPatient);
      expect(component.newPatient).toBeNull();
    });

    it('should show create patient form', () => {
      component.showCreatePatientForm();

      expect(component.selectedPatient).toBeNull();
      expect(component.newPatient).toEqual({
        id: 0,
        name: '',
        age: 0,
        contactDetails: '',
        medicalHistory: '',
        currentMedications: '',
        assignedRegimens: []
      });
    });

    it('should create a new patient', () => {
      const newPatient: Patient = { id: 3, name: 'New Patient', age: 20, contactDetails: '456-789-1234', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };

      component.newPatient = newPatient;
      component.createPatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients`);
      expect(req.request.method).toBe('POST');
      req.flush(newPatient);

      expect(component.patients).toContain(newPatient);
      expect(component.newPatient).toBeNull();
    });

    it('should handle error when creating a new patient fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.newPatient = { id: 3, name: 'New Patient', age: 20, contactDetails: '456-789-1234', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      component.createPatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients`);
      expect(req.request.method).toBe('POST');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to create patient');
    });

    it('should handle error when updating a patient fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.selectedPatient = { id: 1, name: 'Updated Patient', age: 35, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      component.updatePatient(component.selectedPatient);

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('PUT');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to update patient');
    });

    it('should delete a patient', () => {
      const patientToDelete: Patient = { id: 1, name: 'Patient To Delete', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };

      component.selectedPatient = patientToDelete;
      component.deletePatient(patientToDelete);

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(component.patients).not.toContain(patientToDelete);
      expect(component.selectedPatient).toBeNull();
    });

    it('should handle error when deleting a patient fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      const patientToDelete: Patient = { id: 1, name: 'Patient To Delete', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      component.selectedPatient = patientToDelete;
      component.deletePatient(patientToDelete);

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('DELETE');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to delete patient');
    });
  });
});
