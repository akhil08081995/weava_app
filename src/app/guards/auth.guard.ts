import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.isUserLoggedIn(); // Replace this with your login check logic

    if (isLoggedIn) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
  }

  // Dummy implementation for user login status
  private isUserLoggedIn(): boolean {
    // Replace with actual logic, e.g., checking a token in localStorage
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists, otherwise false
  }
}
