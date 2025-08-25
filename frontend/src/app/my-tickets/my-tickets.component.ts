import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../contract/Ticket';
import { TicketService } from '../services/ticket.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css',
})
export class MyTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  customerName = 'Customer';
  isAdmin = false;
  dashboardTitle: string = 'Dashboard';
  constructor(
    private service: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const logged = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = logged.role === 'ADMIN';
    this.dashboardTitle = this.isAdmin
      ? 'ADMIN DASHBOARD'
      : 'CUSTOMER DASHBOARD';

    const paramId = this.route.snapshot.paramMap.get('id');
    const userId = paramId ? Number(paramId) : logged.id;

    if (this.isAdmin && paramId) {
      this.service.getUserById(userId).subscribe({
        next: (user) => {
          this.customerName = user.name;
        },
        error: () => {
          this.customerName = `Customer #${userId}`;
        },
      });
    } else {
      this.customerName = logged.name;
    }

    this.service.getTicketsByUser(userId).subscribe({
      next: (data) => (this.tickets = data),
      error: (e) => console.error('Ticket load failed', e),
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  assignTicket(ticket: Ticket) {
    this.router.navigate(['/assign-csr'], {
      state: { ticketId: ticket.id },
    });
  }
}
