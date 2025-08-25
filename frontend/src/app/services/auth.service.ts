  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { User } from '../contract/User';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    header = new HttpHeaders()
     
    .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    private url = 'http://localhost:8080/auth';
    constructor(private http : HttpClient) { }

    login(email: string, password: string): Observable<{ message: string; role: string }> {
    return this.http.post<{ message: string; role: string }>(`${this.url}/login`, { email, password }, {
      headers: this.header
    });
  }
  register(user : User) : Observable<User>{
    return this.http.post<User>(`${this.url}/register`,user,{headers :this.header});
  }
  resetPassword(email: string, password: string): Observable<any> {
  return this.http.post(
    `${this.url}/reset-password`,
    { email, password },
    { headers: this.header, responseType: 'text' } // 👈 important
  );
}
}

