import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealPlanComponent } from './meal-plan.component';
import { MealPlanService } from '../../../services/meal-plan.service';
import { PatientService } from '../../../services/patient.service';
import { MealPlan } from '../../../models/meal-plan.model';
import { Patient } from '../../../models/patient.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

describe('MealPlanComponent', () => {
  let component: MealPlanComponent;
  let fixture: ComponentFixture<MealPlanComponent>;
  let mealPlanService: MealPlanService;
  let patientService: PatientService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealPlanComponent],
      imports: [HttpClientTestingModule],
      providers: [
        MealPlanService,
        PatientService,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MealPlanComponent);
    component = fixture.componentInstance;
    mealPlanService = TestBed.inject(MealPlanService);
    patientService = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch meal plans and populate patient names', () => {
      const expectedMealPlans: MealPlan[] = [
        { id: 1, patientId: 1, plan: [] },
        { id: 2, patientId: 2, plan: [] }
      ];
      const expectedPatients: Patient[] = [
        { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] },
        { id: 2, name: 'Jane Smith', age: 25, contactDetails: '987-654-3210', medicalHistory: 'Asthma', currentMedications: 'Inhaler', assignedRegimens: [] }
      ];

      jest.spyOn(patientService, 'getPatientById').mockImplementation((id: number) => {
        return of(expectedPatients.find(patient => patient.id === id) as Patient);
      });

      component.getMealPlans();

      const req = httpTestingController.expectOne(`${mealPlanService.apiUrl}/mealPlans`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedMealPlans);

      expect(component.mealPlans).toEqual(expectedMealPlans);
      expect(component.mealPlansWithPatientNames).toEqual([
        { ...expectedMealPlans[0], patientName: expectedPatients[0].name },
        { ...expectedMealPlans[1], patientName: expectedPatients[1].name }
      ]);
    });

    it('should select a meal plan and populate patient details', () => {
      const selectedMealPlan: MealPlan = { id: 1, patientId: 1, plan: [{ meal: 'Breakfast', items: ['Oatmeal', 'Banana'] }] };
      const selectedPatient: Patient = { id: 1, name: 'John Doe', age: 30, contactDetails: '123-456-7890', medicalHistory: 'None', currentMedications: 'None', assignedRegimens: [] };

      jest.spyOn(patientService, 'getPatientById').mockReturnValue(of(selectedPatient));

      component.selectMealPlan(selectedMealPlan);

      expect(component.selectedMealPlan).toEqual(selectedMealPlan);
      expect(component.planText).toBe(JSON.stringify(selectedMealPlan.plan, null, 2));
      expect(component.selectedPatient).toEqual(selectedPatient);
    });

    it('should delete a meal plan', () => {
      const mealPlanToDelete: MealPlan = { id: 1, patientId: 1, plan: [] };

      component.selectedMealPlan = mealPlanToDelete;
      component.deleteMealPlan(component.selectedMealPlan);

      const req = httpTestingController.expectOne(`${mealPlanService.apiUrl}/mealPlans/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(component.mealPlans).not.toContain(mealPlanToDelete);
    });
  });
});
