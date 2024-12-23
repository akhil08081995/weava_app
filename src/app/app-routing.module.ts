import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login-signup/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { ForgetPasswordComponent } from './login-signup/forget-password/forget-password.component';
import { QuestionnaireComponent } from './login-signup/questionnaire/questionnaire.component';
import { OnboardingComponent } from './login-signup/onboarding/onboarding.component';

const routes: Routes = [
  // Route protected by AuthGuard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'questionnaire', component: QuestionnaireComponent, canActivate: [AuthGuard] }, // Protected by AuthGuard
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] }, // Protected by AuthGuard

  // Redirect unknown paths to login
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
