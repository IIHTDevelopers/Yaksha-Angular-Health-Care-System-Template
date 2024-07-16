import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PatientDetailComponent } from './components/patient/patient-detail/patient-detail.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { MealPlanComponent } from './components/health-regimen/meal-plan/meal-plan.component';
import { MeditationExerciseComponent } from './components/health-regimen/meditation-exercise/meditation-exercise.component';
import { WorkoutRoutineComponent } from './components/health-regimen/workout-routine/workout-routine.component';
import { MyHealthComponent } from './components/patient/my-health/my-health.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'patients', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'patients/add', component: AddPatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id', component: PatientDetailComponent, canActivate: [AuthGuard] },
  { path: 'meal-plans', component: MealPlanComponent, canActivate: [AuthGuard] },
  { path: 'meditation-exercises', component: MeditationExerciseComponent, canActivate: [AuthGuard] },
  { path: 'workout-routines', component: WorkoutRoutineComponent, canActivate: [AuthGuard] },
  { path: 'my-health', component: MyHealthComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
