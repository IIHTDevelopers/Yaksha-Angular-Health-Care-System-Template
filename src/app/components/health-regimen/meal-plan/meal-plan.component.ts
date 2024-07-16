import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MealPlanService } from '../../../services/meal-plan.service';
import { PatientService } from '../../../services/patient.service';
import { MealPlan } from '../../../models/meal-plan.model';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  mealPlans: MealPlan[] = [];
  mealPlansWithPatientNames: any[] = [];
  selectedMealPlan: MealPlan | null = null;
  selectedPatient: Patient | null = null;
  errorMessage: string = '';
  planText: string = '';

  constructor(
    private mealPlanService: MealPlanService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMealPlans();
  }

  getMealPlans(): void {
    this.mealPlanService.getAllMealPlans().subscribe(
      (data: MealPlan[]) => {
        this.mealPlans = data;
        this.populatePatientNames();
      },
      (error) => {
        this.errorMessage = 'Failed to load meal plans';
        console.error('Error loading meal plans:', error);
      }
    );
  }

  populatePatientNames(): void {
    const patientObservables = this.mealPlans.map(mealPlan =>
      this.patientService.getPatientById(mealPlan.patientId)
    );

    forkJoin(patientObservables).subscribe(
      (patients: Patient[]) => {
        this.mealPlansWithPatientNames = this.mealPlans.map((mealPlan, index) => ({
          ...mealPlan,
          patientName: patients[index].name
        }));
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }

  selectMealPlan(mealPlan: MealPlan): void {
    this.selectedMealPlan = mealPlan;
    this.planText = JSON.stringify(mealPlan.plan, null, 2); // Convert the plan to a formatted JSON string
    this.getPatientDetails(mealPlan.patientId);
  }

  getPatientDetails(patientId: number): void {
    this.patientService.getPatientById(patientId).subscribe(
      (data: Patient) => {
        this.selectedPatient = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load patient details';
        console.error('Error loading patient details:', error);
      }
    );
  }

  createMealPlan(): void {
    const newMealPlan: MealPlan = {
      id: 0,
      patientId: 0,
      plan: []
    };
    this.mealPlanService.createMealPlan(newMealPlan).subscribe(
      (data: MealPlan) => {
        this.mealPlans.push(data);
        this.populatePatientNames();
      },
      (error) => {
        this.errorMessage = 'Failed to create meal plan';
        console.error('Error creating meal plan:', error);
      }
    );
  }

  updateMealPlan(mealPlan: MealPlan): void {
    if (!mealPlan.id) return;
    try {
      mealPlan.plan = JSON.parse(this.planText); // Parse the JSON string back to an array of objects
    } catch (e) {
      this.errorMessage = 'Invalid plan format';
      console.error('Error parsing plan:', e);
      return;
    }
    this.mealPlanService.updateMealPlan(mealPlan.id, mealPlan).subscribe(
      (data: MealPlan) => {
        const index = this.mealPlans.findIndex(mp => mp.id === data.id);
        if (index !== -1) {
          this.mealPlans[index] = data;
          this.populatePatientNames();
        }
      },
      (error) => {
        this.errorMessage = 'Failed to update meal plan';
        console.error('Error updating meal plan:', error);
      }
    );
  }

  deleteMealPlan(mealPlan: MealPlan): void {
    if (!mealPlan.id) return;
    this.mealPlanService.deleteMealPlan(mealPlan.id).subscribe(
      () => {
        this.mealPlans = this.mealPlans.filter(mp => mp.id !== mealPlan.id);
        this.populatePatientNames();
        this.selectedMealPlan = null;
        this.selectedPatient = null;
      },
      (error) => {
        this.errorMessage = 'Failed to delete meal plan';
        console.error('Error deleting meal plan:', error);
      }
    );
  }
}
