import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client/dist/sockjs';
import { Client, Stomp } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketNotificationService {
  private stompClient: Client | null = null;

  constructor(private http: HttpClient) {} // for HTTP

  // WebSocket connect
  connect() {
    if (this.stompClient && this.stompClient.connected) return;
    this.stompClient = Stomp.over(() => new SockJS('http://localhost:8080/ws'));
    this.stompClient.onConnect = (frame) => {
      this.stompClient?.subscribe('/topic/tickets', (msg) => {
        if (msg.body) alert('🔔 ' + msg.body);
      });
    };
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.active) this.stompClient.deactivate();
  }

  sendTicketWS(message: string) {
    this.stompClient?.publish({
    destination: '/app/newTicket',
    body: JSON.stringify({ text: message }),
    headers: { 'content-type': 'application/json' }
  });
  }

  sendTicketHTTP(message: string) {
    return this.http.post('http://localhost:8080/test/newTicket', { text: message });
  }
}
