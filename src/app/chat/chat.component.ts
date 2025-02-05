import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
// 2
import { FileUploadService } from '../services/fileUpload.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: { sender: string; message: string }[] = [];
  messageInput: string = '';

  // 2
  selectedFile: File | null = null;
  uploadStatus: string = '';

  constructor(private socketService: SocketService, private fileUploadService: FileUploadService) {}

  // 2
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async uploadFile(): Promise<void> {
    if (!this.selectedFile) {
      this.uploadStatus = "⚠️ Please select a file.";
      return;
    }

    this.uploadStatus = "Uploading...";
    try {
      await this.fileUploadService.uploadFile(this.selectedFile);
      this.uploadStatus = "✅ Upload successful!";
    } catch (error) {
      this.uploadStatus = "❌ Upload failed!";
      console.error("Error:", error);
    }
  }

  ngOnInit(): void {
    // Listen for incoming messages
    this.socketService.onMessage().subscribe((data) => {
      this.messages.push(data);
    });
  }

  // Send a message
  sendMessage(): void {
    if (this.messageInput.trim()) {
      const message = { sender: 'Client', message: this.messageInput.trim() };
      this.socketService.sendMessage(message);
      this.messageInput = '';
    }
  }
}
