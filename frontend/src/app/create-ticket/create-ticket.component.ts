import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from '../contract/Ticket';

@Component({
  selector: 'app-create-ticket',
  imports: [CommonModule,FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {

  ticket:Partial<Ticket> = {
    title: '',
    description: '',
    priority: 'LOW',
    status: 'OPEN', 
    userId: 0,
    assignedToId: null
  };
  constructor(private service : TicketService,private route : Router){}
  submitTicket(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
    alert('You are not logged in. Please log in first.');
    return;
  }
    this.ticket.userId = user.id;

    this.service.createTicket(this.ticket).subscribe({
      next: () => {
        alert('Ticket created successfully!');
        this.route.navigate(['/customer-dashboard']);
      },
      error: (err) => {
        console.error('Ticket creation failed', err);
        alert(err?.error?.message || 'Failed to create ticket.');
      }
    });
  }
}
