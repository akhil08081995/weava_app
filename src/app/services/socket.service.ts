import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Replace with your server URL
    this.socket = io('https://weavadev1.azurewebsites.net');
  }

  // Emit a message to the server
  sendMessage(message: { sender: string; message: string }): void {
    this.socket.emit('message', message);
  }

  // Listen for messages from the server
  onMessage(): Observable<{ sender: string; message: string }> {
    return new Observable((observer) => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });

      // Cleanup when unsubscribing
      return () => {
        this.socket.off('message');
      };
    });
  }
}
