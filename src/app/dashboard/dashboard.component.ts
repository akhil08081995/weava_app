import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // Fixed typo here
})
export class DashboardComponent {
  isSidebarExpanded: boolean = true;
  
  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
