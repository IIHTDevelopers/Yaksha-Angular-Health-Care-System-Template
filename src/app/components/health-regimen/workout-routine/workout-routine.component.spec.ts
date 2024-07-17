import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutRoutineComponent } from './workout-routine.component';
import { WorkoutRoutineService } from '../../../services/workout-routine.service';
import { PatientService } from '../../../services/patient.service';
import { WorkoutRoutine } from '../../../models/workout-routine.model';
import { Patient } from '../../../models/patient.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WorkoutRoutineComponent', () => {
  let component: WorkoutRoutineComponent;
  let fixture: ComponentFixture<WorkoutRoutineComponent>;
  let workoutRoutineService: WorkoutRoutineService;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutRoutineComponent],
      imports: [HttpClientTestingModule],
      providers: [
        WorkoutRoutineService,
        PatientService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutRoutineComponent);
    component = fixture.componentInstance;
    workoutRoutineService = TestBed.inject(WorkoutRoutineService);
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch workout routines and populate patient names', () => {
      const expectedWorkoutRoutines: WorkoutRoutine[] = [
        { id: 1, patientId: 1, routine: [] },
        { id: 2, patientId: 2, routine: [] }
      ];
      const expectedPatients: Patient[] = [
        { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] },
        { id: 2, name: 'Jane Smith', age: 25, contactDetails: '987-654-3210', medicalHistory: 'Asthma', currentMedications: 'Inhaler', assignedRegimens: [] }
      ];

      jest.spyOn(patientService, 'getPatientById').mockImplementation((id: number) => {
        return of(expectedPatients.find(patient => patient.id === id) as Patient);
      });

      component.getWorkoutRoutines();

      const req = httpTestingController.expectOne(`${workoutRoutineService.apiUrl}/workoutRoutines`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedWorkoutRoutines);

      expect(component.workoutRoutines).toEqual(expectedWorkoutRoutines);
      expect(component.workoutRoutinesWithPatientNames).toEqual([
        { ...expectedWorkoutRoutines[0], patientName: expectedPatients[0].name },
        { ...expectedWorkoutRoutines[1], patientName: expectedPatients[1].name }
      ]);
    });

    it('should select a workout routine and populate patient details', () => {
      const selectedWorkoutRoutine: WorkoutRoutine = { id: 1, patientId: 1, routine: [{ day: 'Monday', exercises: ['Push-ups', 'Squats'] }] };
      const selectedPatient: Patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };

      jest.spyOn(patientService, 'getPatientById').mockReturnValue(of(selectedPatient));

      component.selectWorkoutRoutine(selectedWorkoutRoutine);

      expect(component.selectedWorkoutRoutine).toEqual(selectedWorkoutRoutine);
      expect(component.routineText).toBe(JSON.stringify(selectedWorkoutRoutine.routine, null, 2));
      expect(component.selectedPatient).toEqual(selectedPatient);
    });

    it('should delete a workout routine', () => {
      const workoutRoutineToDelete: WorkoutRoutine = { id: 1, patientId: 1, routine: [] };

      component.selectedWorkoutRoutine = workoutRoutineToDelete;
      component.deleteWorkoutRoutine(component.selectedWorkoutRoutine);

      const req = httpTestingController.expectOne(`${workoutRoutineService.apiUrl}/workoutRoutines/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(component.workoutRoutines).not.toContain(workoutRoutineToDelete);
    });
  });
});
