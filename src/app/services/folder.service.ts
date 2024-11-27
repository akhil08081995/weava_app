import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  private baseUrl = environment.apiBaseUrl + '/folders';

  constructor(private http: HttpClient) {}

  /**
   * Fetch the root folder using POST.
   * @returns Observable<any> - Root folder data
   */
  saveRootFolder(): Observable<any> {
    return this.http.post(`${this.baseUrl}/root`, {});
  }

  /**
   * Fetch the default folder using POST.
   * @returns Observable<any> - Default folder data
   */
  saveDefaultFolder(): Observable<any> {
    return this.http.post(`${this.baseUrl}/default`, {});
  }

  /**
   * Fetch a folder by its ID using POST.
   * @param id - Folder ID
   * @returns Observable<any> - Folder data for the given ID
   */
  updateFolderById(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}`, {});
  }
}
