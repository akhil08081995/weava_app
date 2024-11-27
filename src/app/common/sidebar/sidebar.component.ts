import { Component } from '@angular/core';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  rootFolder: any;
  defaultFolder: any;
  specificFolder: any;

  constructor(private folderService: FolderService) {}

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
  }
}
