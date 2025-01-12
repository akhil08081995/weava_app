import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private baseUrl = 'https://weavadev1.azurewebsites.net/folders';

  constructor(private http: HttpClient) {}

  getFolderDetails(folderId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${folderId}`);
  }

  /**
   * Get Authorization headers with the token.
   * @returns HttpHeaders
   */
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken'); // Retrieve auth token
    return new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    });
  }

  /**
   * Fetch the folder list using GET.
   * @returns Observable<any> - Folder list data
   */
  getFolderList(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  /**
   * Fetch the root folder using POST.
   * @returns Observable<any> - Root folder data
   */
  saveRootFolder(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/root`, {}, { headers });
  }

  /**
   * Fetch the default folder using POST.
   * @returns Observable<any> - Default folder data
   */
  saveDefaultFolder(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/default`, {}, { headers });
  }

  /**
   * Fetch a folder by its ID using POST.
   * @param id - Folder ID
   * @returns Observable<any> - Folder data for the given ID
   */
  updateFolderById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/${id}`, {}, { headers });
  }

  /**
   * Create a new folder using POST.
   * @param folderData - Folder data containing title
   * @returns Observable<any> - Created folder response
   */
  createFolder(folderData: { title: string }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/root`, folderData, { headers });
  }

  createSubfolder(folderId: string, payload: { title: string }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/${folderId}`, payload, { headers });
  }   
}
