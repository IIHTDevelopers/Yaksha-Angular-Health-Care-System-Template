import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MeditationExerciseComponent } from './meditation-exercise.component';
import { MeditationExerciseService } from '../../../services/meditation-exercise.service';
import { PatientService } from '../../../services/patient.service';
import { MeditationExercise } from '../../../models/meditation-exercise.model';
import { Patient } from '../../../models/patient.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

describe('MeditationExerciseComponent', () => {
  let component: MeditationExerciseComponent;
  let fixture: ComponentFixture<MeditationExerciseComponent>;
  let meditationExerciseService: MeditationExerciseService;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeditationExerciseComponent],
      imports: [HttpClientTestingModule],
      providers: [
        MeditationExerciseService,
        PatientService,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MeditationExerciseComponent);
    component = fixture.componentInstance;
    meditationExerciseService = TestBed.inject(MeditationExerciseService);
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch meditation exercises and populate patient names', () => {
      const expectedMeditationExercises: MeditationExercise[] = [
        { id: 1, patientId: 1, exercises: [] },
        { id: 2, patientId: 2, exercises: [] }
      ];
      const expectedPatients: Patient[] = [
        { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] },
        { id: 2, name: 'Jane Smith', age: 25, contactDetails: '987-654-3210', medicalHistory: 'Asthma', currentMedications: 'Inhaler', assignedRegimens: [] }
      ];

      jest.spyOn(patientService, 'getPatientById').mockImplementation((id: number) => {
        return of(expectedPatients.find(patient => patient.id === id) as Patient);
      });

      component.getMeditationExercises();

      const req = httpTestingController.expectOne(`${meditationExerciseService.apiUrl}/meditationExercises`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedMeditationExercises);

      expect(component.meditationExercises).toEqual(expectedMeditationExercises);
      expect(component.meditationExercisesWithPatientNames).toEqual([
        { ...expectedMeditationExercises[0], patientName: expectedPatients[0].name },
        { ...expectedMeditationExercises[1], patientName: expectedPatients[1].name }
      ]);
    });

    it('should select a meditation exercise and populate patient details', () => {
      const selectedMeditationExercise: MeditationExercise = { id: 1, patientId: 1, exercises: [{ title: 'Mindfulness', description: 'A basic mindfulness exercise', resources: ['link1', 'link2'] }] };
      const selectedPatient: Patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };

      jest.spyOn(patientService, 'getPatientById').mockReturnValue(of(selectedPatient));

      component.selectMeditationExercise(selectedMeditationExercise);

      expect(component.selectedMeditationExercise).toEqual(selectedMeditationExercise);
      expect(component.exercisesText).toBe(JSON.stringify(selectedMeditationExercise.exercises, null, 2));
      expect(component.selectedPatient).toEqual(selectedPatient);
    });

    it('should delete a meditation exercise', () => {
      const meditationExerciseToDelete: MeditationExercise = { id: 1, patientId: 1, exercises: [] };

      component.selectedMeditationExercise = meditationExerciseToDelete;
      component.deleteMeditationExercise(component.selectedMeditationExercise);

      const req = httpTestingController.expectOne(`${meditationExerciseService.apiUrl}/meditationExercises/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(component.meditationExercises).not.toContain(meditationExerciseToDelete);
    });
  });
});
