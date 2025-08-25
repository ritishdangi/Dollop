import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent implements OnInit{
  customer = {
    id: 0,
    name: '',
    email: ''
  };
  showCustomerInfo = false;
  constructor(private router: Router) {}
  tickets: any[] = [];
    ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id || user.role !== 'CUSTOMER') {
      alert('Unauthorized access');
      this.router.navigate(['/login']);
      return;
    }
    this.customer = {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  createTicket() {
    this.router.navigate(['/createticket']);
  }
  viewTickets() {
    this.router.navigate(['/my-ticket']);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
