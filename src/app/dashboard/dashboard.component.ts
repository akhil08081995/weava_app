import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;

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

  constructor() {
    // Close popup if clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement; // Type cast the event.target to HTMLElement
      if (target && !target.closest('#popup') && !target.closest('.download')) {
        this.closePopup();
      }
    });
  }
  ngOnInit(): void {}
}
