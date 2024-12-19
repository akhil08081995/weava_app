import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadFolders } from '../../store/folder.actions';
import { FolderService } from '../../services/folder.service';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
})
export class SidebarComponent implements OnInit {
  rootFolder: any;
  defaultFolder: any;
  specificFolder: any;
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;
  loginDetails: any;
  folders$!: Observable<any[]>; // Ensured proper initialization with the non-null assertion operator

  constructor(
    private folderService: FolderService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private store: Store<{ folder: { folderList: any[] } }>
  ) {
    // Close popup when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target && !target.closest('#popup') && !target.closest('.menu-panel-footer')) {
        this.closePopup();
      }
    });
  }

  ngOnInit(): void {
    // Log response from FolderService (debugging purposes)
    this.folderService.getFolderList().subscribe({
      next: (data) => {
        console.log('Folder List:', data);
      },
      error: (err) => {
        console.error('Error fetching folder list:', err);
      },
    });

    // Dispatch action to load folders (NgRx Store)
    this.store.dispatch(loadFolders());

    // Select folder list from the NgRx store
    this.folders$ = this.store.select((state) => state.folder.folderList);

    // Uncomment if needed: Fetch default folder
    // this.folderService.saveDefaultFolder().subscribe({
    //   next: (data) => (this.defaultFolder = data),
    //   error: (err) => console.error('Error fetching default folder:', err),
    // });

    // Uncomment if needed: Fetch specific folder by ID
    // const folderId = '92049bab-4274-4311-ba74-4b595f5a76b2';
    // this.folderService.updateFolderById(folderId).subscribe({
    //   next: (data) => (this.specificFolder = data),
    //   error: (err) => console.error(`Error fetching folder ${folderId}:`, err),
    // });

    // Load login details from localStorage
    const loginDetails = localStorage.getItem('login-details');
    if (loginDetails) {
      this.loginDetails = JSON.parse(loginDetails);
    }
  }

  // Open Account Details Dialog
  openAccountDetailsDialog(): void {
    this.dialog.open(AccountDetailsComponent, {
      width: '400px', // Customize width
      data: {}, // Pass data if required
    });
  }

  // Toggle popup visibility
  togglePopup(event: Event): void {
    event.stopPropagation(); // Prevents bubbling up
    this.isPopupVisible = !this.isPopupVisible;

    // Add or remove blur effect
    document.body.classList.toggle('blurred', this.isPopupVisible);
  }

  // Close popup
  closePopup(): void {
    this.isPopupVisible = false;
    document.body.classList.remove('blurred'); // Remove blur
  }
}
