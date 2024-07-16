import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AddPatientComponent } from './add-patient.component';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddPatientComponent', () => {
  let component: AddPatientComponent;
  let fixture: ComponentFixture<AddPatientComponent>;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPatientComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        PatientService,
        { provide: Router, useValue: { navigate: jest.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPatientComponent);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should create a new patient and navigate to patient list', () => {
      const newPatient: Patient = {
        id: 1,
        name: 'John Doe',
        age: 30,
        contactDetails: '123-456-7890',
        medicalHistory: 'None',
        currentMedications: 'None',
        assignedRegimens: []
      };

      component.patient = newPatient;
      component.addPatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients`);
      expect(req.request.method).toBe('POST');
      req.flush(newPatient);

      expect(router.navigate).toHaveBeenCalledWith(['/patients']);
      expect(component.errorMessage).toBe('');
    });

    it('should handle error when adding patient fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.addPatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients`);
      expect(req.request.method).toBe('POST');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to add patient');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
