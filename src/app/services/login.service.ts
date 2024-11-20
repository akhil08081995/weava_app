import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginApiUrl = `${environment.apiBaseUrl}/auth/login`;
  private facebookAuthUrl = `${environment.apiBaseUrl}/auth/facebook`;
  private googleAuthUrl = `${environment.apiBaseUrl}/auth/google`;
  private signupApiUrl = `${environment.apiBaseUrl}/auth/signup`;

  constructor(private http: HttpClient) {}

  // Method to call the login API
  login(email: string, password: string): Observable<HttpResponse<any>> {
    const loginData = { email, password };

    const response = this.http.post<any>(this.loginApiUrl, loginData, {
      observe: 'response',
    });
    console.log('API response:', response); // Logs the observable itself

    return response;
  }

  // Method to call Facebook authentication API
  authenticateWithFacebook(): Observable<any> {
    return this.http.get(this.facebookAuthUrl, {});
  }

  // Method to call Google authentication API
  authenticateWithGoogle(): Observable<any> {
    return this.http.get(this.googleAuthUrl, {});
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
}
