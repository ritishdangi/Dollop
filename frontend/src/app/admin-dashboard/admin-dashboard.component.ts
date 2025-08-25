import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink,FormsModule,NotificationComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit,AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;
    video.muted = true;   // ensure muted
    video.play().catch(err => console.log('Autoplay prevented:', err));
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video is playing!');
        })
        .catch(error => {
          console.warn('Autoplay prevented, user interaction required.', error);
        });
    }
  }
  
tickets: any;

  openTickets = 0;
  users = 0;
  constructor(private service: TicketService, private uService: AuthService,private router : Router) {}
  ngOnInit(): void {
    const us = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = us.id;
    if (!us?.id || us.role !== 'ADMIN') {
      alert('Unauthorized access');
      this.router.navigate(['/login']);
      return;
    }
    this.service.getAllCustomer(userId).subscribe({
      next: (data) => {
        this.users = data.length;
      },
      error: (err) => {
        console.error('Error loading users', err);
      },
    });
    this.service.getAllTicket().subscribe({
      next: (tickets) => {
        this.openTickets = tickets.filter(
          (t: any) => t.status === 'OPEN'
        ).length;
      },
      error: (err) => {
        console.error('Error loading tickets', err);
      },
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
