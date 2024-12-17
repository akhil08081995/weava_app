import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginApiUrl = `${environment.apiBaseUrl}/auth/login`;
  private facebookAuthUrl = `${environment.apiBaseUrl}/auth/facebook`;
  private googleAuth = `${environment.apiBaseUrl}/auth/google`;
  private signupApiUrl = `${environment.apiBaseUrl}/auth/signup`;
  private sdkLoaded = false; // Track if SDK is already loaded

  private tokenUrl = 'https://oauth2.googleapis.com/token'; // Google Token endpoint
  loginDetails: any;
  clientGId = environment.googleClientId;
  appId = environment.facebookAppId;
  userDetails: any;

  constructor(private http: HttpClient) {
    this.loadFacebookSDK();
  }

  // Method to call the login API
  login(email: string, password: string): Observable<HttpResponse<any>> {
    const loginData = { email, password };

    const response = this.http.post<any>(this.loginApiUrl, loginData, {
      observe: 'response',
    });

    return response;
  }

  // Method to call the signup API
  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    const signupData = { email, password, firstName, lastName };
    return this.http.post(this.signupApiUrl, signupData);
  }

  initializeGoogleSignIn(
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ) {
    (window as any).google.accounts.id.initialize({
      client_id: this.clientGId, // Replace with your Google client ID
      callback: (response: any) =>
        this.handleCredentialResponse(response, onSuccess),
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
      }
    );

    (window as any).google.accounts.id.prompt(); // Optional
  }

  private handleCredentialResponse(
    response: any,
    onSuccess: (response: any) => void
  ) {
    // Decode the JWT token manually (like we discussed before)
    const decodedToken = this.decodeJwt(response.credential);

    // Store the decoded user details
    this.userDetails = decodedToken;

    // Call the success callback with the decoded user details
    onSuccess(this.userDetails);
  }

  private decodeJwt(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  // To retrieve the stored user details
  getUserDetails() {
    return this.userDetails;
  }

  /**
   * Load Facebook SDK dynamically
   */
  private loadFacebookSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.sdkLoaded) {
        resolve(); // SDK is already loaded
        return;
      }

      // Set up fbAsyncInit
      (window as any).fbAsyncInit = () => {
        (window as any).FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: 'v16.0', // Use the appropriate Facebook Graph API version
        });
        this.sdkLoaded = true;
        resolve(); // SDK successfully initialized
      };
    });
  }

  loginWithFacebook(
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ) {
    this.loadFacebookSDK()
      .then(() => {
        (window as any).FB.login(
          (response: any) => {
            if (response.authResponse) {
              onSuccess(response); // Successful login
            } else {
              onError('User cancelled login or did not fully authorize.');
            }
          },
          { scope: 'public_profile,email' } // Request the desired permissions
        );
      })
      .catch((error) => {
        console.error('Facebook SDK Error:', error);
        onError('Facebook SDK not loaded.');
      });
  }
}
