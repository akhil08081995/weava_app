import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { QuestionnaireComponent } from './login-signup/questionnaire/questionnaire.component';
import { OnboardingComponent } from './login-signup/onboarding/onboarding.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard
import { LoginComponent } from './login-signup/login.component';

const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Routes protected by AuthGuard
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    canActivate: [AuthGuard],
  },

  // Redirect unknown paths to login
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
