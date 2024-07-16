import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    PatientListComponent,
    PatientDetailComponent,
    AddPatientComponent,
    MealPlanComponent,
    MeditationExerciseComponent,
    WorkoutRoutineComponent,
    MyHealthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
