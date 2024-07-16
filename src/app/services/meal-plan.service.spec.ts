import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealPlanService } from './meal-plan.service';
import { MealPlan } from '../models/meal-plan.model';

describe('MealPlanService', () => {
  let service: MealPlanService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MealPlanService]
    });
    service = TestBed.inject(MealPlanService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all meal plans', () => {
      const expectedMealPlans: MealPlan[] = [
        { id: 1, patientId: 1, plan: [{ meal: 'Breakfast', items: ['Oatmeal', 'Banana'] }] },
        { id: 2, patientId: 2, plan: [{ meal: 'Lunch', items: ['Salad', 'Chicken'] }] }
      ];
      service.getAllMealPlans().subscribe(mealPlans => {
        expect(mealPlans).toEqual(expectedMealPlans);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/mealPlans`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMealPlans);
    });

    it('should get meal plan by ID', () => {
      const expectedMealPlan: MealPlan = { id: 1, patientId: 1, plan: [{ meal: 'Breakfast', items: ['Oatmeal', 'Banana'] }] };
      service.getMealPlanById(1).subscribe(mealPlan => {
        expect(mealPlan).toEqual(expectedMealPlan);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/mealPlans/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedMealPlan);
    });

    it('should create a new meal plan', () => {
      const newMealPlan: MealPlan = { id: 3, patientId: 3, plan: [{ meal: 'Dinner', items: ['Steak', 'Potatoes'] }] };
      service.createMealPlan(newMealPlan).subscribe(mealPlan => {
        expect(mealPlan).toEqual(newMealPlan);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/mealPlans`);
      expect(req.request.method).toEqual('POST');
      req.flush(newMealPlan);
    });

    it('should update meal plan', () => {
      const updatedMealPlan: MealPlan = { id: 1, patientId: 1, plan: [{ meal: 'Breakfast', items: ['Oatmeal', 'Apple'] }] };
      service.updateMealPlan(1, updatedMealPlan).subscribe(mealPlan => {
        expect(mealPlan).toEqual(updatedMealPlan);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/mealPlans/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedMealPlan);
    });

    it('should delete meal plan', () => {
      service.deleteMealPlan(1).subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/mealPlans/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
