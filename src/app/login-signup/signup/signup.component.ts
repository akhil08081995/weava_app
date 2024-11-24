import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;
  showSignupForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailInput: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  mergeAccount: any;
  switchToLogin() {
    throw new Error('Method not implemented.');
  }
  signOut() {
    throw new Error('Method not implemented.');
  }
  goToTerms() {
    throw new Error('Method not implemented.');
  }
  showSignupFormClick(): void {
    this.showSignupForm = true; // Show the signup form
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const {
        firstName,
        lastName,
        emailInput: email,
        password,
      } = this.signupForm.value;
      this.loginService.signup(email, password, firstName, lastName).subscribe(
        (res: any) => {
          console.log('signUp successful:', res);
          // Handle successful login, e.g., navigate to the dashboard
          if (res === 201) {
            console.log('signUp successful:', res);
            localStorage.setItem('authToken', res.idToken);
            // this.router.navigate(['/questionnaire']); // Navigate to the dashboard
            this.router.navigate(['/dashboard']); // Navigate to the dashboard
          }
        },
        (error: any) => {
          console.error('signUp failed:', error);
          // Handle login error
        }
      );
    }
  }
  facebookDialogOpen() {
    throw new Error('Method not implemented.');
  }
}
