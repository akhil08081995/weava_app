import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Fixed typo: styleUrl -> styleUrls
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  googleClientId = environment.googleClientId;
  authToken: string | null = null;

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

  ngOnInit(): void {
    // Redirect to dashboard if already logged in
    const authToken = localStorage.getItem('authToken');
    if (authToken && this.isTokenValid(authToken)) {
      this.router.navigate(['/dashboard']);
      return; // Prevent further execution of the login page
    }

    // Initialize Google Sign-In
    this.loginService.initializeGoogleSignIn(
      this.onGoogleSignInSuccess.bind(this),
      this.onGoogleSignInError.bind(this)
    );
  }

  // Getters for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Submit the login form
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.loginService.login(email, password).subscribe(
        (res: any) => {
          console.log('Login successful:', res);
          if (res.status === 201) {
            const token = res.body.authToken;
            localStorage.setItem('authToken', token);
            localStorage.setItem('login-details', JSON.stringify(res.body));

            // Navigate to dashboard on successful login
            this.router.navigate(['/dashboard']);
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
    }
  }

  // Google Sign-In Success Callback
  onGoogleSignInSuccess(response: any): void {
    console.log('Google Sign-In successful:', response);
    const user = this.loginService.getUserDetails();

    if (user && user.email_verified) {
      this.loginService.signup(user.email, 'null', user.given_name, user.family_name).subscribe(
        (res: any) => {
          if (res === 201) {
            console.log('Sign-up successful:', res);
            localStorage.setItem('authToken', res.idToken);

            // Navigate to questionnaire after successful signup
            this.router.navigate(['/questionnaire']);
          }
        },
        (error: any) => {
          console.error('Sign-up failed:', error);
        }
      );
    }
  }

  // Google Sign-In Error Callback
  onGoogleSignInError(error: any): void {
    console.error('Google Sign-In failed:', error);
  }

  // Facebook Login
  loginWithFacebook(): void {
    this.loginService.loginWithFacebook(
      this.onFacebookLoginSuccess.bind(this),
      this.onFacebookLoginError.bind(this)
    );
  }

  // Facebook Login Success Callback
  onFacebookLoginSuccess(response: any): void {
    console.log('Facebook Login successful:', response);
    const accessToken = response.authResponse.accessToken;

    // Optionally, send the accessToken to the backend for validation
  }

  // Facebook Login Error Callback
  onFacebookLoginError(error: any): void {
    console.error('Facebook Login failed:', error);
  }

  // Open Terms and Privacy Policy in a new tab
  goToTerms(): void {
    window.open('https://example.com/terms-and-privacy', '_blank'); // Replace with the actual URL
  }

  // Switch to the Signup Page
  switchToSignup(): void {
    this.router.navigate(['/signup']);
  }

  // Switch to the Forget Password Page
  switchToForgetPassword(): void {
    this.router.navigate(['/forget-password']);
  }

  // Validate JWT Token
  private isTokenValid(token: string): boolean {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenPayload.exp > currentTime; // Check expiration time
    } catch (error) {
      console.error('Invalid token:', error);
      return false; // Invalid token
    }
  }
}
