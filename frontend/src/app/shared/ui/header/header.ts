import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { UserStorageService } from '../../../core/services/storage/user-storage';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink ,MatMenuModule , MatDividerModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  storeService=inject(UserStorageService);
  authService=inject(AuthService);
  router=inject(Router);

currentUser = signal<string | null>(localStorage.getItem('user.username'));

ngOnInit() {
  this.currentUser.set( this.storeService.getUserFromStorage().username);
}

onLogout() {
  
  this.authService.logout();
  this.currentUser.set(null);
  this.router.navigate(['/login']);
}
}
