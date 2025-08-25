import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-csr-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './csr-dashboard.component.html',
  styleUrl: './csr-dashboard.component.css'
})
export class CsrDashboardComponent implements OnInit {
  tickets: any[] = [];
  csrName: string = '';

  constructor(private service: TicketService, private router: Router) {}

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!loggedInUser?.id || loggedInUser.role !== 'CSR') {
      alert('Unauthorized access');
      this.router.navigate(['/login']);
      return;
    }

    this.csrName = loggedInUser.name;

    this.service.getTicketsAssignedToCsr(loggedInUser.id).subscribe({
      next: (data) => {
        this.tickets = data;

        this.tickets.forEach(ticket => {
          ticket.updatedStatus = ticket.status; // Set initial dropdown value
          this.service.getUserById(ticket.userId).subscribe({
            next: (user) => {
              ticket.customerName = user.name;
            },
            error: () => {
              ticket.customerName = 'Unknown';
            }
          });
        });
      },
      error: (err) => {
        console.log('Failed to load tickets', err);
      }
    });
  }

  updateStatus(ticket: any): void {
    this.service.updateTicketStatus(ticket.id, ticket.updatedStatus).subscribe({
      next: () => {
        ticket.status = ticket.updatedStatus; // Sync updated status
        alert('Status updated!');
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update status');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
