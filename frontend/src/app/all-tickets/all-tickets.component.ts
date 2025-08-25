import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../contract/Ticket';
import { TicketService } from '../services/ticket.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-tickets',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './all-tickets.component.html',
  styleUrl: './all-tickets.component.css'
})
export class AllTicketsComponent implements OnInit{
  tickets : Ticket[] = [];
  
  constructor(private service : TicketService,private router : Router){}
  ngOnInit(): void {
    this.service.getAllTicket().subscribe({
      next: (data) => {
        this.tickets = data;

        
        this.tickets.forEach(ticket => {
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
      error: (err) => console.error('Failed to load tickets', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }

}
