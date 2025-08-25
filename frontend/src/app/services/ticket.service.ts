import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../contract/Ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private url = 'http://localhost:8080/ticket';
  private baseurl = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) {}

  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Ticket>(`${this.url}/create`, ticket,{ headers });
  }
  getTicketsByUser(userId: number): Observable<Ticket[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Ticket[]>(`${this.url}/user/${userId}`,{headers});
  }
  getAllCustomer(id: any): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`http://localhost:8080/auth/get?userId=${id}`,{headers});
  }
  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseurl}/get/${id}`,{headers});
  }
  getAllCsr(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseurl}/getCsr`,{headers});
  }
  assignTicket(ticketId: number, csrId: number, adminId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(
      `http://localhost:8080/ticket/assign/${ticketId}/${csrId}?adminId=${adminId}`,
      null,{headers}
    );
  }
  getTicketsAssignedToCsr(csrId: number): Observable<Ticket[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Ticket[]>(
      `http://localhost:8080/ticket/assigned/${csrId}`,{headers}
    );
  }

  updateTicketStatus(ticketId: number, status: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return this.http.put(`${this.url}/update/${ticketId}/status?status=${status}`, {},{headers});
}

  getAllTicket() : Observable<Ticket[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Ticket[]>(`${this.url}/get`,{headers});
  }
}
