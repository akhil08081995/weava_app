import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { loadGapiInsideDOM, gapi } from 'gapi-script';
import { environment } from '../../environment';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  googleClientId = environment.googleClientId;

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

  ngOnInit(): void {
    this.loginService.initializeGoogleSignIn(
      this.onGoogleSignInSuccess.bind(this),
      this.onGoogleSignInError.bind(this)
    );
  }

  onGoogleSignInSuccess(response: any) {
    console.log('Google Sign-In successful', response);

    // Now the user details are stored in the service
    const user = this.loginService.getUserDetails(); // You can retrieve the stored user details here
    console.log('Stored User Details:', user);

    // Call your API with the idToken
    // fetch('https://weavadev1.azurewebsites.net//auth/google', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token: idToken }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('API Response:', data);
    //   })
    //   .catch((error) => {
    //     console.error('API Error:', error);
    //   });
  }

  onGoogleSignInError(error: any) {
    console.error('Google Sign-In failed', error);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe(
        (res: any) => {
          console.log('Login successful:', res);
          // Handle successful login, e.g., navigate to the dashboard
          if (res.status === 201) {
            const token = res.body.authToken;
            localStorage.setItem('authToken', token);
            localStorage.setItem('login-details', JSON.stringify(res.body));

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
    this.router.navigate(['/forget-password']);
  }
  goToTerms() {
    throw new Error('Method not implemented.');
  }

  loginWithFacebook() {
    this.loginService.loginWithFacebook(
      this.onFacebookLoginSuccess.bind(this),
      this.onFacebookLoginError.bind(this)
    );
  }

  onFacebookLoginSuccess(response: any) {
    console.log('Facebook Login successful', response);
    const accessToken = response.authResponse.accessToken;

    // // Call your API with the accessToken
    // fetch('https://weavadev1.azurewebsites.net//auth/google', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token: accessToken }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('API Response:', data);
    //   })
    //   .catch((error) => {
    //     console.error('API Error:', error);
    //   });
  }

  onFacebookLoginError(error: any) {
    console.error('Facebook Login failed', error);
  }
}
