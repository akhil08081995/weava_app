import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weava_app';
  showLayout: any;
  authToken: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if authToken exists in localStorage
    this.authToken = localStorage.getItem('authToken');

    // Listen to route changes to control layout visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        // Show layout only for authenticated routes (like /dashboard)
        this.showLayout = ['/dashboard'].includes(currentRoute) && !!this.authToken;
      }
    });
  }

  logout(): void {
    // Clear the authToken and refresh the state
    localStorage.removeItem('authToken');
    this.authToken = null;
    this.showLayout = false; // Hide the layout after logging out
    this.router.navigate(['/login']); // Redirect to login page
  }
}
