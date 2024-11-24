import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weava_app';
  showLayout: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      // Show layout only on authenticated routes like /dashboard
      this.showLayout = ['/dashboard'].includes(currentRoute);
    });
  }
}
