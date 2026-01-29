import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStorageService {
  private readonly USER_KEY = 'user';
  
  // Using a Signal so the Navbar/UI updates automatically when the user logs in
  public currentUser = signal<any>(this.getUserFromStorage());

  saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
  }

   getUserFromStorage(): any {
    const user = localStorage.getItem(this.USER_KEY);
    console.log('Retrieved user from storage:', user);
    return user ? JSON.parse(user) : null;
  }
}