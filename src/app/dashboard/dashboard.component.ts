import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FolderService } from '../services/folder.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../common/account-details/account-details.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarExpanded: boolean = true;
  isPopupVisible: boolean = false;
  loginDetails: any;
  folderDetails: any; // To store folder details
  folderId: string | null = null; // Active folder ID

  constructor(
    private route: ActivatedRoute,
    private folderService: FolderService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    // Close popup if clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement; // Type cast the event.target to HTMLElement
      if (target && !target.closest('#popup') && !target.closest('.download')) {
        this.closePopup();
      }
    });
  }
  ngOnInit(): void {
    this.getFolderId(); // Fetch folderId
    this.getLoginDetails(); // Fetch login details
    this.fetchFolderDetails(); // Fetch folder details
    this.listenToFolderIdChanges(); // Listen to folderId changes

    const loginDetails = localStorage.getItem('login-details');
    if (loginDetails) {
      this.loginDetails = JSON.parse(loginDetails);
      // this.loginDetails = parsedData.displayName;
    }
  }

  // Fetch folderId from URL or localStorage
  private getFolderId(): void {
    this.route.queryParams.subscribe((params) => {
      this.folderId =
        params['folder'] || localStorage.getItem('folderId') || null;
    });
  }

  setActiveFolder(folderId: string): void {
    this.folderId = folderId;
    localStorage.setItem('folderId', folderId); // Save active folder ID in localStorage
    this.router.navigate([], {
      queryParams: { folder: folderId }, // Update query parameters with the folder ID
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });
  }  

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name;
      const fileSize = file.size;

      if (!this.folderId) {
        alert('No active folder ID found.');
        return;
      }

      const payload = {
        fileNameList: [fileName],
        folderId: this.folderId,
      };

      this.uploadFile(payload, fileSize); // Include fileSize for the second API
    }
  }

  // Upload file to the server
  private uploadFile(
    payload: { fileNameList: string[]; folderId: string },
    fileSize: number
  ): void {
    const apiUrl = 'https://weavadev1.azurewebsites.net/files/getSignedUrl';

    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        console.log('Signed URL fetched successfully:', response);

        // Extract details from the response for the second API
        const fileData = response[0];
        const pdfPayload = {
          fileSize: fileSize,
          folderId: payload.folderId,
          host: 'https://www.weavatools.com/apis',
          id: fileData.id,
          originalFileName: fileData.originalFileName,
        };

        this.processPDF(pdfPayload); // Call the second API
      },
      error: (error: any) => {
        console.error('Error fetching signed URL:', error);
        alert('Error fetching signed URL. Please try again.');
      },
    });
  }

  // Process the PDF file
  private processPDF(payload: {
    fileSize: number;
    folderId: string;
    host: string;
    id: string;
    originalFileName: string;
  }): void {
    const apiUrl = 'https://weavadev1.azurewebsites.net/files/pdf';

    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {
        console.log('PDF processed successfully:', response);
        alert('PDF processing completed successfully.');
      },
      error: (error: any) => {
        console.error('Error processing PDF:', error);
        alert('Error processing PDF. Please try again.');
      },
    });
  }

  // Fetch login details from localStorage
  private getLoginDetails(): void {
    const loginDetails = localStorage.getItem('login-details');
    if (loginDetails) {
      this.loginDetails = JSON.parse(loginDetails);
      console.log('Login Details:', this.loginDetails);
    }
  }

  // Listen for folderId changes from queryParams or localStorage
  private listenToFolderIdChanges(): void {
    this.route.queryParams.subscribe((params) => {
      this.folderId =
        params['folder'] || localStorage.getItem('folderId') || null;
      console.log('Active Folder ID:', this.folderId);

      // Save active folderId to localStorage
      if (this.folderId) {
        localStorage.setItem('folderId', this.folderId);
        this.fetchFolderDetails(); // Fetch folder details whenever folderId changes
      } else {
        console.warn('No folder ID provided.');
        this.folderDetails = null;
      }
    });
  }

  // Fetch folder details from the service
  private fetchFolderDetails(): void {
    if (this.folderId) {
      this.folderService.getFolderDetails(this.folderId).subscribe({
        next: (data) => {
          console.log('Folder Details:', data);
          this.folderDetails = data.folderDetails; // Store folder details
        },
        error: (err) => {
          console.error('Error fetching folder details:', err);
        },
      });
    } else {
      console.error('No folder ID available for fetching details.');
    }
  }

  // Open account details dialog
  openAccountDetailsDialog(): void {
    this.dialog.open(AccountDetailsComponent, {
      width: '400px',
      data: {},
    });
  }

  // Toggle popup visibility
  togglePopup(event: Event): void {
    event.stopPropagation();
    this.isPopupVisible = !this.isPopupVisible;

    if (this.isPopupVisible) {
      document.body.classList.add('blurred');
    } else {
      document.body.classList.remove('blurred');
    }
  }

  // Close popup
  closePopup(): void {
    this.isPopupVisible = false;
    document.body.classList.remove('blurred');
  }

  formatDateWithSuffix(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const daySuffix = this.getDaySuffix(day);
    return `${day}${daySuffix} ${month}, ${year}, ${time}`;
  }

  private getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
