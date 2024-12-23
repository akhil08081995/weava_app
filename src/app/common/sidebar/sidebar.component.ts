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
  folders: any[] = []; // Store folder list
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;
  newFolderTitle: string = ''; // Variable to bind input field

  constructor(
    private folderService: FolderService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private store: Store<{ folder: { folderList: any[] } }>
  ) {}

  ngOnInit(): void {
    this.fetchFolders(); // Initial fetch for folders

    // Dispatch action to load folders (NgRx Store)
    this.store.dispatch(loadFolders());
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
