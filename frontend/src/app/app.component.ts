import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketNotificationService } from './services/ticket-notification.service';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'fullStack';

  
}
