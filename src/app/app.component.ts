import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weava_app';
  showLayout: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello, world!', 'Success');
  }

  showError() {
    this.toastr.error('Something went wrong!', 'Error');
  }

  showInfo() {
    this.toastr.info('Here is some information.', 'Info');
  }

  showWarning() {
    this.toastr.warning('Be careful!', 'Warning');
  }

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
