import { Component } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  rootFolder: any;
  defaultFolder: any;
  specificFolder: any;
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;
  loginDetails: any;

  constructor(private folderService: FolderService, private loginService: LoginService, private dialog: MatDialog) {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement; // Type cast the event.target to HTMLElement
      if (target && !target.closest('#popup') && !target.closest('.menu-panel-footer')) {
        this.closePopup();
      }
    });
  }

  ngOnInit(): void {
    // Fetch default folder
    this.folderService.saveDefaultFolder().subscribe((data) => {
      this.defaultFolder = data;
    });

    // Fetch specific folder by ID
    const folderId = '92049bab-4274-4311-ba74-4b595f5a76b2';
    this.folderService.updateFolderById(folderId).subscribe((data) => {
      this.specificFolder = data;
    });

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
