import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weava_app';
  showLayout: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateLayoutVisibility();

    // Listen to route changes to control layout visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLayoutVisibility();
      }
    });
  }

  private updateLayoutVisibility(): void {
    const authToken = localStorage.getItem('authToken');
    const isAuthenticated = !!authToken; // Check if the user is logged in
    const currentRoute = this.router.url.split('?')[0]; // Ignore query parameters

    // Show sidebar and header for authenticated users on specific routes
    this.showLayout =
      isAuthenticated &&
      ['/dashboard', '/other-routes-you-want'].includes(currentRoute);
  }
}
