import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutRoutineService } from './workout-routine.service';
import { WorkoutRoutine } from '../models/workout-routine.model';

describe('WorkoutRoutineService', () => {
  let service: WorkoutRoutineService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutRoutineService]
    });
    service = TestBed.inject(WorkoutRoutineService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all workout routines', () => {
      const expectedWorkoutRoutines: WorkoutRoutine[] = [
        { id: 1, patientId: 1, routine: [{ day: 'Monday', exercises: ['Push-ups', 'Squats'] }] },
        { id: 2, patientId: 2, routine: [{ day: 'Tuesday', exercises: ['Pull-ups', 'Lunges'] }] }
      ];
      service.getAllWorkoutRoutines().subscribe((workoutRoutines: any) => {
        expect(workoutRoutines).toEqual(expectedWorkoutRoutines);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/workoutRoutines`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedWorkoutRoutines);
    });

    it('should get workout routine by ID', () => {
      const expectedWorkoutRoutine: WorkoutRoutine = { id: 1, patientId: 1, routine: [{ day: 'Monday', exercises: ['Push-ups', 'Squats'] }] };
      service.getWorkoutRoutineById(1).subscribe((workoutRoutine: any) => {
        expect(workoutRoutine).toEqual(expectedWorkoutRoutine);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/workoutRoutines/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedWorkoutRoutine);
    });

    it('should create a new workout routine', () => {
      const newWorkoutRoutine: WorkoutRoutine = { id: 3, patientId: 3, routine: [{ day: 'Wednesday', exercises: ['Bench Press', 'Deadlift'] }] };
      service.createWorkoutRoutine(newWorkoutRoutine).subscribe((workoutRoutine: any) => {
        expect(workoutRoutine).toEqual(newWorkoutRoutine);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/workoutRoutines`);
      expect(req.request.method).toEqual('POST');
      req.flush(newWorkoutRoutine);
    });

    it('should update workout routine', () => {
      const updatedWorkoutRoutine: WorkoutRoutine = { id: 1, patientId: 1, routine: [{ day: 'Monday', exercises: ['Push-ups', 'Squats', 'Plank'] }] };
      service.updateWorkoutRoutine(1, updatedWorkoutRoutine).subscribe((workoutRoutine: any) => {
        expect(workoutRoutine).toEqual(updatedWorkoutRoutine);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/workoutRoutines/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedWorkoutRoutine);
    });

    it('should delete workout routine', () => {
      service.deleteWorkoutRoutine(1).subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/workoutRoutines/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
