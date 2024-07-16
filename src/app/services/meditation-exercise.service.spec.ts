import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MeditationExerciseService } from './meditation-exercise.service';
import { MeditationExercise } from '../models/meditation-exercise.model';

describe('MeditationExerciseService', () => {
  let service: MeditationExerciseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MeditationExerciseService]
    });
    service = TestBed.inject(MeditationExerciseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all meditation exercises', () => {
      const expectedMeditationExercises: MeditationExercise[] = [
        { id: 1, patientId: 1, exercises: [{ title: 'Mindfulness', description: 'A basic mindfulness exercise', resources: ['link1', 'link2'] }] },
        { id: 2, patientId: 2, exercises: [{ title: 'Body Scan', description: 'A body scan meditation', resources: ['link3', 'link4'] }] }
      ];
      service.getAllMeditationExercises().subscribe(meditationExercises => {
        expect(meditationExercises).toEqual(expectedMeditationExercises);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/meditationExercises`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMeditationExercises);
    });

    it('should get meditation exercise by ID', () => {
      const expectedMeditationExercise: MeditationExercise = { id: 1, patientId: 1, exercises: [{ title: 'Mindfulness', description: 'A basic mindfulness exercise', resources: ['link1', 'link2'] }] };
      service.getMeditationExerciseById(1).subscribe(meditationExercise => {
        expect(meditationExercise).toEqual(expectedMeditationExercise);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/meditationExercises/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMeditationExercise);
    });

    it('should create a new meditation exercise', () => {
      const newMeditationExercise: MeditationExercise = { id: 3, patientId: 3, exercises: [{ title: 'Visualization', description: 'A visualization meditation', resources: ['link5', 'link6'] }] };
      service.createMeditationExercise(newMeditationExercise).subscribe(meditationExercise => {
        expect(meditationExercise).toEqual(newMeditationExercise);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/meditationExercises`);
      expect(req.request.method).toEqual('POST');
      req.flush(newMeditationExercise);
    });

    it('should update meditation exercise', () => {
      const updatedMeditationExercise: MeditationExercise = { id: 1, patientId: 1, exercises: [{ title: 'Mindfulness', description: 'An updated mindfulness exercise', resources: ['link1', 'link2', 'link7'] }] };
      service.updateMeditationExercise(1, updatedMeditationExercise).subscribe(meditationExercise => {
        expect(meditationExercise).toEqual(updatedMeditationExercise);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/meditationExercises/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedMeditationExercise);
    });

    it('should delete meditation exercise', () => {
      service.deleteMeditationExercise(1).subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/meditationExercises/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
