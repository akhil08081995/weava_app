import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../common/account-details/account-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;
  loginDetails: any;

  constructor(private loginService: LoginService, private dialog: MatDialog) {
    // Close popup if clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement; // Type cast the event.target to HTMLElement
      if (target && !target.closest('#popup') && !target.closest('.download')) {
        this.closePopup();
      }
    });
  }
  ngOnInit(): void {
    const loginDetails = localStorage.getItem('login-details');
    if (loginDetails) {
      this.loginDetails = JSON.parse(loginDetails);
      // this.loginDetails = parsedData.displayName;
    }
  }

  openAccountDetailsDialog() {
    this.dialog.open(AccountDetailsComponent, {
      width: '400px', // Customize width
      data: {}, // If you want to pass any data to the dialog
    });
  }

  togglePopup(event: Event): void {
    event.stopPropagation(); // Prevents the event from bubbling up
    this.isPopupVisible = !this.isPopupVisible;

    // Add or remove the body blur effect
    if (this.isPopupVisible) {
      document.body.classList.add('blurred');
    } else {
      document.body.classList.remove('blurred');
    }
  }

  closePopup(): void {
    this.isPopupVisible = false;
    document.body.classList.remove('blurred'); // Remove blur when popup is closed
  }
}
