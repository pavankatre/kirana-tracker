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

  logout() {
    // Future: return this.http.post('/api/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.removeUser();
  }


  register(userData: any): Observable<any> {
    
    return this.httpService.post<any>('auth/register', userData);
  }

  login(credentials: any): Observable<any> {
    return this.httpService.post<any>('auth/login', credentials).pipe(
      tap(res => {
        if (res.status === 'success') {
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
    );
  }
}