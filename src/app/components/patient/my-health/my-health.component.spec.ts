import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyHealthComponent } from './my-health.component';
import { AuthService } from '../../../services/auth.service';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { User } from '../../../models/user.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MyHealthComponent', () => {
  let component: MyHealthComponent;
  let fixture: ComponentFixture<MyHealthComponent>;
  let authService: AuthService;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyHealthComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        PatientService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MyHealthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch patient details for the current user', () => {
      const mockUser: User = { id: 1, username: 'testuser', password: 'testpass', role: 'patient' };
      const mockPatient: Patient = {
        id: 1,
        name: 'John Doe',
        age: 30,
        contactDetails: '123-456-7890',
        medicalHistory: 'None',
        currentMedications: 'None',
        assignedRegimens: []
      };

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(mockUser);

      component.ngOnInit();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPatient);

      expect(component.patient).toEqual(mockPatient);
    });

    it('should handle error when fetching patient details fails', () => {
      const mockUser: User = { id: 1, username: 'testuser', password: 'testpass', role: 'patient' };
      const errorResponse = new ErrorEvent('Network error');

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(mockUser);

      component.ngOnInit();

      const req = httpTestingController.expectOne(`${patientService.apiUrl}/patients/1`);
      expect(req.request.method).toBe('GET');
      req.error(errorResponse);

      expect(component.errorMessage).toBe('Failed to load patient details');
      expect(component.patient).toBeNull();
    });
  });
});
