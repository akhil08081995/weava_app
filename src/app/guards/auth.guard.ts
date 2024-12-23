import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');

    if (this.isValidToken(token)) {
      return true; // Allow access if token is valid
    } else {
      this.router.navigate(['/login']); // Redirect to login
      return false; // Block access
    }
  }

  // Check if the token is valid
  private isValidToken(token: string | null): boolean {
    if (!token) {
      return false; // No token, not valid
    }

    try {
      // Decode and validate token (e.g., expiration check, structure)
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      const currentTime = Math.floor(Date.now() / 1000);

      return tokenPayload.exp > currentTime; // Check if the token is expired
    } catch (error) {
      console.error('Invalid token:', error);
      return false; // Invalid token format
    }
  }
}
