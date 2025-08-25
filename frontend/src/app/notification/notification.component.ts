import { Component, OnInit } from '@angular/core';
import { TicketNotificationService } from '../services/ticket-notification.service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  standalone: true,
})
export class NotificationComponent implements OnInit {
  constructor(private ticketNotificationService: TicketNotificationService) {}

  ngOnInit(): void {
    console.log('🔔 NotificationComponent loaded');
    this.ticketNotificationService.connect();
  }

  ngOnDestroy(): void {
    this.ticketNotificationService.disconnect();
  }

  // WebSocket se send
  sendTestWS() {
    this.ticketNotificationService.sendTicketWS('🎫 New Ticket via WebSocket at ' + new Date());
  }

  // HTTP POST se send
  sendTestHTTP() {
    this.ticketNotificationService.sendTicketHTTP('🎫 New Ticket via HTTP at ' + new Date())
      .subscribe({
        next: (res) => console.log('HTTP POST sent:', res),
        error: (err) => console.error(err)
      });
  }
}
