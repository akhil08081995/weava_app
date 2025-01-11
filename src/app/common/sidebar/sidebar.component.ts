import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadFolders } from '../../store/folder.actions';
import { FolderService } from '../../services/folder.service';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
})
export class SidebarComponent implements OnInit {
  folders: any[] = []; // Store folder list
  activeFolderId: string | null = null; // Active folder ID
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;
  newFolderTitle: string = 'New Folder'; // Variable to bind input field

  constructor(
    private folderService: FolderService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<{ folder: { folderList: any[] } }>
  ) {}

  ngOnInit(): void {
    this.fetchFolders(); // Initial fetch for folders

    this.store.dispatch(loadFolders()); // Dispatch action to load folders (NgRx Store)

    // Fetch folder ID from URL or localStorage
    this.route.queryParams.subscribe((params) => {
      this.activeFolderId = params['folder'] || localStorage.getItem('folderId') || null;

      // Save active folder ID to localStorage
      if (this.activeFolderId) {
        localStorage.setItem('folderId', this.activeFolderId);
      }
    });
  }

  // Fetch folders from the service
  private fetchFolders(): void {
    this.folderService.getFolderList().subscribe({
      next: (data) => {
        console.log('Folder List:', data);
        this.folders = data.folderList; // Save folder list in a component property
      },
      error: (err) => {
        console.error('Error fetching folder list:', err);
      },
    });
  }

  // Set active folder
  setActiveFolder(folderId: string): void {
    this.activeFolderId = folderId;
    localStorage.setItem('folderId', folderId); // Save active folder ID
    this.router.navigate([], {
      queryParams: { folder: folderId },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }

  // Handle folder creation
  onCreateFolder(): void {
    if (!this.newFolderTitle.trim()) {
      console.error('Folder title cannot be empty');
      return;
    }

    const newFolder = { title: this.newFolderTitle }; // Create folder payload
    this.folderService.createFolder(newFolder).subscribe({
      next: (response: any) => {
        console.log('Folder created successfully:', response);
        this.fetchFolders(); // Refresh folder list after creation
        this.newFolderTitle = ''; // Clear the input field
      },
      error: (error: any) => {
        console.error('Error creating folder:', error);
      },
    });
  }

  createSubFolder(folderId: string): void {
    if (!folderId) {
      console.error('Folder ID is required to create a subfolder.');
      return;
    }
  
    const newSubFolder = { title: 'New Folder' }; // Payload for subfolder creation
  
    this.folderService.createSubfolder(folderId, newSubFolder).subscribe({
      next: (response: any) => {
        console.log('Subfolder created successfully:', response);
        this.fetchFolders(); // Refresh folder list after successful creation
      },
      error: (error: any) => {
        // Extract error message from the response
        const errorMessage =
          error?.error?.metadata?.error?.message ||
          'An unexpected error occurred. Please try again.';
        this.toastr.error(errorMessage, 'Error');
        console.error('Error creating subfolder:', errorMessage);
      },
    });
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

  signout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('folderId');
    this.router.navigate(['/login']);
  }
}
