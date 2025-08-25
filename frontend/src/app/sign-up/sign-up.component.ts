import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { User } from '../contract/User';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userData: User = {
  name: '',
  email: '',
  password: '',
  role: 'CUSTOMER'
};
  constructor(private auth : AuthService,private router : Router){}
  onSubmit() {
    this.auth.register(this.userData).subscribe({
      next: (res) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed');
      }
    });
  }
}
