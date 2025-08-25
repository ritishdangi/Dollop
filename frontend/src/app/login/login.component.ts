import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  resetData = { email: '', newPassword: '' };
  loginFailed = false;
  showResetForm = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService
        .login(this.loginData.email, this.loginData.password)
        .subscribe({
          next: (res:any) => {
            alert('Login successful');
            localStorage.setItem('user', JSON.stringify(res));
            localStorage.setItem('token', res.token);
            const role = res.role;
            alert(`${role}`);
            if (role === 'CUSTOMER') {
              this.router.navigate(['/customer-dashboard']);
            } else if (role === 'ADMIN') {
              this.router.navigate(['/admin-dashboard']);
            } else if (role === 'CSR') {
              this.router.navigate(['/csr-dashboard']);
            } else {
              alert('Unknown role. Cannot route.');
            }
            // this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error(err);
            alert('Invalid email or password');
            this.loginFailed = true;
          },
      });
    }
  }
   resetPassword() {
    if (this.resetData.email && this.resetData.newPassword) {
      this.authService.resetPassword(this.resetData.email, this.resetData.newPassword).subscribe({
        next: (res: any) => {
          alert('Password reset successful. Please login again.');
          this.showResetForm = false;
          this.loginFailed = false;
          this.resetData = { email: '', newPassword: '' };
        },
        error: (err) => {
          alert('Failed to reset password');
        },
      });
    }
  }
}
  