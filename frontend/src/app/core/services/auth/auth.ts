import { inject, Injectable } from '@angular/core';
import { UserStorageService } from '../storage/user-storage';
import { HttpService } from '../http/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
constructor(private httpService: HttpService) {}
  private store= inject(UserStorageService);
  // Check if user is logged in
  isLoggedIn() {
   // return !!localStorage.getItem('token');
    return !!this.store.currentUser();
  }

  // register(userData: any) {
  //   console.log('Registering user:', userData);
  //   // Future: return this.http.post('/api/register', userData);
  //  // localStorage.setItem('user', JSON.stringify(userData));
  //  this.store.saveUser(userData);
  // }

  // login(credentials: any) {
  //   // Future: return this.http.post('/api/login', credentials);
  //   localStorage.setItem('token', 'fake-jwt-token');
  // }


  // login(credentials: any): boolean {
  //   // 1. In future: this.http.post('/api/login', credentials)
    
  //   // 2. Industry Standard: Create a user object from response
  //   const mockUser = { 
  //     email: credentials.email, 
  //     token: 'fake-jwt-token',
  //     role: 'ADMIN' 
  //   };

  //   // 3. CRITICAL: Update the store so the Signal notifies the Guard
  //   this.store.saveUser(mockUser);
    
  //   return true; // Tell the component login was successful
  // }

  logout() {
    // Future: return this.http.post('/api/logout');
    localStorage.removeItem('token');
    this.store.removeUser();
  }


  register(userData: any): Observable<any> {
    return this.httpService.post('auth/register', userData);
  }

  login(credentials: any): Observable<any> {
    return this.httpService.post<any>('auth/login', credentials).pipe(
      tap(res => {
        if (res.status === 'success') {
          localStorage.setItem('token', res.data.token);
        }
      })
    );
  }
}