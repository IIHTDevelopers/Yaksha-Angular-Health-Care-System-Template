import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PatientDetailComponent', () => {
  let component: PatientDetailComponent;
  let fixture: ComponentFixture<PatientDetailComponent>;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientDetailComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        PatientService,
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDetailComponent);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch patient details based on route params', () => {
      const expectedPatient: Patient = {
        id: 1,
        name: 'John Doe',
        age: 30,
        contactDetails: '123-456-7890',
        medicalHistory: 'None',
        currentMedications: 'None',
        assignedRegimens: []
      };

      component.ngOnInit();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedPatient);

      expect(component.patient).toEqual(expectedPatient);
    });

    it('should handle error when fetching patient details fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.ngOnInit();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('GET');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to load patient details');
      expect(component.patient).toBeNull();
    });

    it('should update patient details and navigate to patient list', () => {
      const updatedPatient: Patient = {
        id: 1,
        name: 'John Doe Updated',
        age: 31,
        contactDetails: '123-456-7890',
        medicalHistory: 'None',
        currentMedications: 'None',
        assignedRegimens: []
      };

      component.patient = updatedPatient;
      component.updatePatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedPatient);

      expect(router.navigate).toHaveBeenCalledWith(['/patients']);
      expect(component.errorMessage).toBe('');
    });

    it('should handle error when updating patient details fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      component.updatePatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('PUT');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to update patient');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should delete patient and navigate to patient list', () => {
      component.patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      component.deletePatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(router.navigate).toHaveBeenCalledWith(['/patients']);
    });

    it('should handle error when deleting patient fails', () => {
      const errorResponse = new ErrorEvent('Network error');

      component.patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };
      component.deletePatient();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('DELETE');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to delete patient');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
