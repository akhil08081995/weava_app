import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe(
        (res: any) => {
          console.log('Login successful:', res);
          // Handle successful login, e.g., navigate to the dashboard
          if (res.status === 201) {
            console.log('Login successful:', res);
            // localStorage.setItem('authToken', res.body.token);
            this.router.navigate(['/dashboard']); // Navigate to the dashboard
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          // Handle login error
        }
      );
    }
  }

  switchToSignup() {
    this.router.navigate(['/signup']);
  }
  switchToForgetPassword() {
    throw new Error('Method not implemented.');
  }
  goToTerms() {
    throw new Error('Method not implemented.');
  }
}
