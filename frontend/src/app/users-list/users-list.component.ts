import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  customers : any[] = [];
  constructor(private service : TicketService, private router : Router){}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const userid = user.id;
    this.service.getAllCustomer(userid).subscribe({
      next : (data) => {
        console.log(data);
        this.customers = data.filter(user => user.role === 'CUSTOMER');
      },
      error : (err) => {  
        console.error('Failed to fetch customers', err);
      }
    });
  }
  viewCustomerTickets(userId : number){
    this.router.navigate(['/my-ticket',userId]);
  }
}
